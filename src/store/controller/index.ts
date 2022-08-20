import { QueryResult } from "pg";

interface IController {
  find: (table: string, id?: string) => Promise<QueryResult<any>
  create: (id?: string) => Promise<QueryResult<any>
  update: async update();
  delete: async delete();
}

export default class Controller {

}
