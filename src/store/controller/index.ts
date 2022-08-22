import { QueryResult } from 'pg';
import {
  CreateData,
  UpdateData,
  Data,
  GetData,
  Id,
  MultipleId,
  TableName,
} from '../model';
import {
  SqlEncloseFormats,
  SqlParamsFormats,
  idToArray,
  buildSqlParams,
} from './sqlParamsFormatters';
import Connection from './connection';

type Table = TableName;

interface IController {
  find: (table: Table, id?: MultipleId) => Promise<Data[]>
  create: (table: Table, data: CreateData) => Promise<GetData[]>
  update: (table: Table, id: Id, data: UpdateData) => Promise<Data[]>
  delete: (table: Table, id: MultipleId) => Promise<GetData[]>
}

export default class Controller implements IController {
  private connection = new Connection();

  async find(table: Table, id?: MultipleId) {
    const statement = `SELECT * FROM ${table} ${
      id && `WHERE id IN${
        buildSqlParams({
          object: id,
        })?.keys
      }`
    }`;
    const values = idToArray(id);

    const res: QueryResult<Data> = await this.connection.runQuery(statement, values);
    return res.rows;
  }

  async create(table: Table, data: CreateData) {
    const statement = `INSERT INTO ${table} ${
      buildSqlParams({
        object: data,
        paramsFormat: SqlParamsFormats.onlyNames,
      })?.keys
    } VALUES ${
      buildSqlParams({
        object: data,
      })?.keys
    }`;
    const values = Object.values(data);

    const res: QueryResult<GetData> = await this.connection.runQuery(statement, values);
    return res.rows;
  }

  async update(table: Table, id: Id, data: UpdateData) {
    const sqlParams = buildSqlParams({
      object: data,
      paramsFormat: SqlParamsFormats.namedParams,
      encloseFormat: SqlEncloseFormats.none,
    });

    const statement = `UPDATE ${table} SET ${
      sqlParams?.keys
    } WHERE id = $${(sqlParams?.endIn ?? 0) + 1}`;
    const values = [...Object.values(data), ...idToArray(id)];

    const res: QueryResult<Data> = await this.connection.runQuery(statement, values);
    return res.rows;
  }

  async delete(table: Table, id: MultipleId) {
    const statement = `DELETE FROM ${table} ${id && `WHERE id IN${
      buildSqlParams({
        object: id,
      })?.keys
    }`}`;
    const values = idToArray(id);

    const res: QueryResult<GetData> = await this.connection.runQuery(statement, values);
    return res.rows;
  }
}
