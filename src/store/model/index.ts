export interface tables {
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

export type table = tables[keyof tables];
