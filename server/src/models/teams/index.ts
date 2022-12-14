import { ServerStatus, Team } from '@prisma/client';
import { prisma } from '../../data';
import { DEFAULT_KUBERNETES_NAMESPACE, SERVER_STATUS } from '../../utils/constants';
import kubernetes from '../kubernetes';

class Teams {
  public async getTeams() {
    return prisma.team.findMany({
      include: {
        server: true,
      },
    });
  }

  public async getTeam(name: string) {
    return prisma.team.findUnique({
      where: {
        name,
      },
      include: {
        server: true,
      },
    });
  }

  public async createTeam(name: string) {
    try {
      await prisma.team.create({
        data: {
          name,
        },
      });
    } catch (err) {
      if (err.meta.target.includes('name')) {
        throw { message: 'Team already exists', status: 409 };
      } else throw err;
    }

    await Promise.all([
      kubernetes.createDeployment(name, DEFAULT_KUBERNETES_NAMESPACE),
      kubernetes.createService(name, DEFAULT_KUBERNETES_NAMESPACE),
    ]);

    let team;
    const checkServiceIp = () =>
      new Promise((resolve) => {
        const interval = setInterval(async () => {
          const service = await kubernetes.getService(name + '-svc', DEFAULT_KUBERNETES_NAMESPACE);

          if (service.status.loadBalancer.ingress?.[0].ip) {
            team = await prisma.team.update({
              where: {
                name,
              },
              data: {
                server: {
                  create: {
                    ip: service.status.loadBalancer.ingress[0].ip,
                    status: SERVER_STATUS.RUNNING,
                  },
                },
              },
              include: {
                server: true,
              },
            });
            clearInterval(interval);
            resolve(true);
          }
        }, 2000);
      });

    await checkServiceIp();
    return { message: 'Team created', results: team };
  }

  public async deleteTeam(name: string) {
    try {
      await prisma.team.delete({
        where: {
          name,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw { message: err.meta.cause, status: 404 };
      } else throw err;
    }

    await Promise.all([
      kubernetes.deleteDeployment(name, DEFAULT_KUBERNETES_NAMESPACE),
      kubernetes.deleteService(name + '-svc', DEFAULT_KUBERNETES_NAMESPACE),
    ]);

    return { message: 'Team deleted' };
  }

  public async updateTeam(name: string, payload: Team) {
    try {
      await prisma.team.update({
        where: {
          name,
        },
        data: {
          ...payload,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw { message: err.meta.cause, status: 404 };
      } else if (err.meta.target.includes('name')) {
        throw { message: 'Team already exists', status: 409 };
      } else throw err;
    }

    await kubernetes.updateDeployment(name, payload.name, DEFAULT_KUBERNETES_NAMESPACE);
    await kubernetes.updateService(name + '-svc', payload.name + '-svc', DEFAULT_KUBERNETES_NAMESPACE);

    return { message: 'Team updated' };
  }
}

export default new Teams();
