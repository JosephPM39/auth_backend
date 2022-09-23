import { StatusModel } from './status/data';
import { UserModel } from './user/data';

export { Store } from './base/data';
export { BaseModel } from './base/data';

export { IController, BaseController } from './base/controller';

export const AllEntities = {
  StatusModel,
  UserModel,
};

export {
  StatusModel,
  UserModel,
};

export const EntitiesORM = [
  ...Object.values(AllEntities),
];

export { validate } from 'class-validator';
