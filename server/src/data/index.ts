import { Pool } from 'pg';
import { DATABASE_URL } from '../configs/env';

export const pg = new Pool({
  connectionString: DATABASE_URL,
  ssl: false,
});
