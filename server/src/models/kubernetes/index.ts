import * as k8s from '@kubernetes/client-node';
import kc from '../../utils/kubernetes';

class Kubernetes {
  private coreApi = kc.makeApiClient(k8s.CoreApi);
  private coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
  private appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
  public watch = new k8s.Watch(kc);
  public async getVersion() {
    return this.coreApi.getAPIVersions().then((res) => res.body);
  }

  public async getNamespaces() {
    return this.coreV1Api.listNamespace().then((res) => res.body);
  }

  public async getNamespace(name: string) {
    return this.coreV1Api.readNamespace(name).then((res) => res.body);
  }

  public async getServices(namespace: string) {
    return this.coreV1Api.listNamespacedService(namespace).then((res) => res.body);
  }

  public async getService(name: string, namespace: string) {
    return this.coreV1Api.readNamespacedService(name, namespace).then((res) => res.body);
  }

  public async getDeployments(namespace: string) {
    return this.appsV1Api.listNamespacedDeployment(namespace).then((res) => res.body);
  }

  public async getDeployment(name: string, namespace: string) {
    return this.appsV1Api.readNamespacedDeployment(name, namespace).then((res) => res.body);
  }

  public async getPods(namespace: string) {
    return this.coreV1Api.listNamespacedPod(namespace).then((res) => res.body);
  }

  public async getPod(name: string, namespace: string) {
    return this.coreV1Api.readNamespacedPod(name, namespace).then((res) => res.body);
  }

  public async createNamespace(name: string) {
    const namespace = {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name,
      },
    };

    return this.coreV1Api.createNamespace(namespace).then((res) => res.body);
  }

  public async createService(name: string, namespace: string) {
    const service = {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: `${name}-svc`,
      },
      spec: {
        type: 'LoadBalancer',
        selector: {
          app: name,
        },
        ports: [
          {
            port: 80,
          },
        ],
      },
    };

    return this.coreV1Api.createNamespacedService(namespace, service).then((res) => res.body);
  }

  public async createDeployment(name: string, namespace: string) {
    const deployment = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name,
        labels: {
          app: name,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: name,
            },
          },
          spec: {
            containers: [
              {
                name: 'nodered',
                image: 'registrypocappintegrator.azurecr.io/custom-nodered',
                ports: [
                  {
                    containerPort: 80,
                  },
                ],
                env: [
                  {
                    name: 'team',
                    value: name,
                  },
                  {
                    name: 'PORT',
                    value: '80',
                  },
                  {
                    name: 'DATABASE_URL',
                    value: 'postgresql://postgresadmin:admin123321@10.0.81.118:5432',
                  },
                ],
              },
            ],
          },
        },
      },
    };

    return this.appsV1Api.createNamespacedDeployment(namespace, deployment).then((res) => res.body);
  }

  public async deleteService(name: string, namespace: string) {
    return this.coreV1Api.deleteNamespacedService(name, namespace).then((res) => res.body);
  }

  public async deleteDeployment(name: string, namespace: string) {
    return this.appsV1Api.deleteNamespacedDeployment(name, namespace).then((res) => res.body);
  }
}

export default new Kubernetes();
