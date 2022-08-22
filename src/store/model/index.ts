import type { UserTypes } from './users.model';
import type { TABLES_NAMES, TableName, TableBase } from './tables.model';

// export interface TABLES_NAMES {
// 	STATUS: 'status',
// 	USERS: 'users',
// 	SERVICES: 'services',
// 	SESSIONS: 'sessions',
// 	AREAS: 'areas',
// 	ROLES: 'roles',
// 	ACTIONS: 'actions',
// 	ENTITIES: 'entities',
// 	PERMISSIONS: 'permissions',
// 	PERMISSIONS_ROLES: 'permissions_roles',
// 	USERS_ROLES: 'users_roles',
// }
//
type DataTypes = {
	[key in TABLES_NAMES['USERS']]: UserTypes;
}

type CreateData = DataTypes[TableName]['create'];
type UpdateData = DataTypes[TableName]['update'];
type Data = DataTypes[TableName]['base'];
type GetData = DataTypes[TableName]['get'];

type Id = DataTypes[TableName]['base']['id'];
type MultipleId = Id | Id[]

export type {
  DataTypes,
  CreateData,
  UpdateData,
  Data,
  GetData,
  Id,
  MultipleId,
};

export type {
  UserTypes,
};

export type {
  TABLES_NAMES,
  TableName,
  TableBase,
};

export { UserSchemas } from './users.model';
