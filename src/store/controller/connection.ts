import { Pool, Client } from 'pg';
import config from '../config';

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
const credentials = {
  connectionString: `postgres://${USER}:${PASS}@${config.dbHost}`
                    + `:${config.dbPort}/${config.dbName}`,
};

export default class Connection {
  private ConnectionMethod = Client;

  private connection = new this.ConnectionMethod(credentials);

  runQuery(query: string, values: any[]) {
    return this.connection.query(query, values);
  }

  new() {
    this.connection = new this.ConnectionMethod(credentials);
  }

  end() {
    this.connection.end();
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
