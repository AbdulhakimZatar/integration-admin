import { NODE_ENV } from '../configs/env';
import { ENVIRONMENTS } from '../utils/constants';
import { getUUID } from '../utils/helpers';

export default (err, req, res, next) => {
  const isProdEnv = NODE_ENV === ENVIRONMENTS.PRODUCTION;
  const errorUUID = getUUID();
  let errorMessage = isProdEnv ? `Internal Server Error: ${errorUUID}` : err.message;

  if (isProdEnv) console.error(`ERROR[${errorUUID}]:`, err);
  if (err.status === 400) errorMessage = 'Invalid Request';

  res.status(err.status || 500);
  res.statusMessage = 'Server Error';
  res.json({ error: errorMessage });
};
