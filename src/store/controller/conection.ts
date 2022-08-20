import { Pool, Client } from 'pg';
import config from '../config';

const credentials = {
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPass,
  port: config.dbPort,
};

export default class Connection {
  pool = new Pool(credentials);

  runQuery(query: string) {
    return this.pool.query(query);
  }

  new() {
    this.pool = new Pool(credentials);
  }

  end() {
    this.pool.end();
  }
}

// Pool Connection

export const poolDemo = async () => {
  const pool = new Pool(credentials);
  const nowDate = await pool.query('SELECT NOW()');
  await pool.end();

  return nowDate;
};

// Client Connection

export const clientDemo = async () => {
  const client = new Client(credentials);
  await client.connect();
  const nowDate = await client.query('SELECT NOW()');
  await client.end();

  return nowDate;
};
