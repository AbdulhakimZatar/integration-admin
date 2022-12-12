import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
kc.loadFromFile('../../.kube/config');

export default kc;

function test() {
  console.log('test');
}
