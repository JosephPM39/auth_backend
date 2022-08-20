import Ajv, { JTDDataType } from 'ajv/dist/jtd';
import addFormats from 'ajv-formats';

export interface ITablesNames {
	status: 'status';
	users: 'users';
	services: 'services';
	sessions: 'sessions',
	areas: 'areas';
	roles: 'roles';
	actions: 'actions';
	entities: 'entities';
	permissions: 'permissions';
	permissionsRoles: 'permissions_roles';
	usersRoles: 'users_roles';
}

export type TableName = ITablesNames[keyof ITablesNames];

const ajv = new Ajv();
// Formats to extend Ajv
addFormats(ajv);

export { ajv, JTDDataType };
