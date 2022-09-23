export interface IController<T, Create, Id, Get, Update > {
  create(data: Create | string): Promise<boolean | Id>;
  read(id?: Id | Get | string): Promise<T | null | T[]>;
  update(id: Id, data: Update | string): Promise<boolean>;
  delete(id: Id | Get | string): Promise<boolean>;
}
