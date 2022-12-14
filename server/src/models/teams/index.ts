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
        }, 4000);
      });

    await checkServiceIp();
    return team;
  }

  public async deleteTeam(name: string) {
    let team;
    try {
      team = await prisma.team.delete({
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

    return team;
  }
}

export default new Teams();
