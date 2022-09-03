export interface IController<T, Create, Id, Get, Update > {
  create(data: Create | string): Promise<boolean | Create>;
  read(id?: Id | Get): Promise<T | null| T[]>;
  //update(id: Id, data: Update): Promise<boolean | Update>;
  //delete(id: Id | Get): Promise<boolean | T>;
}
