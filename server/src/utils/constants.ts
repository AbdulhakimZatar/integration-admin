import { ServerStatus } from '@prisma/client';

export const ENVIRONMENTS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export const SERVER_STATUS: {
  [key in string]: ServerStatus;
} = {
  PENDING: 'Pending',
  RUNNING: 'Running',
  STOPPED: 'Stopped',
};

export const DEFAULT_KUBERNETES_NAMESPACE = 'node-red';
