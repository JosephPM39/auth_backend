import { Status } from './status.model';
import { User } from './users.model';

export const AllEntities = {
  Status,
  User,
};

export {
  Status,
  User,
};

export const EntitiesORM = [
  ...Object.values(AllEntities),
];

export { validate } from 'class-validator';
