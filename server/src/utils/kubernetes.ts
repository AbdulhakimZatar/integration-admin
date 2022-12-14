import * as k8s from '@kubernetes/client-node';
import path from 'path';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
kc.loadFromFile(path.resolve(__dirname, '../configs/kubeconfig'));

export default kc;
