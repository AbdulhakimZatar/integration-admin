import { NODE_ENV } from '../configs/env';
import { ENVIRONMENTS } from '../utils/constants';
import { getUUID } from '../utils/helpers';

export default (err, req, res, next) => {
  const isProdEnv = NODE_ENV === ENVIRONMENTS.PRODUCTION;
  const errorUUID = getUUID();
  let errorMessage = isProdEnv ? `Internal Server Error: ${errorUUID}` : err.body?.message ?? err.message;

  const timestamp = new Date().toISOString();
  console.error(`\x1b[31mERROR\x1b[0m[\x1b[1m${errorUUID}\x1b[0m][${timestamp}]:`, err);
  if (err.status === 400 && isProdEnv) errorMessage = 'Invalid Request';

  res.status(err.body?.code || err.status || 500);
  res.statusMessage = 'Server Error';
  res.json({ error: errorMessage });
};
