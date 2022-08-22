import { JTDDataType, TableSchemaBase } from './tables.model';

// Schemas

const BaseSchema = {
  type: 'object',
  properties: {
    id: TableSchemaBase.properties.id,
    name: { type: 'string', minimum: 1, maximum: 80 },
    nick_name: { type: 'string', minimum: 1, maximum: 20 },
    pass: { type: 'string', minimum: 8, maximum: 255 },
    email: { type: 'string', format: 'email', maximum: 60 },
    date_up: { type: 'timestamp', format: 'date-time', parseDate: true },
    recovery_token: { type: 'string', maximum: 255, nullable: true },
    status_id: TableSchemaBase.properties.id,
  },
  required: ['name', 'nick_name', 'email'],
} as const;

const GetSchema = {
  type: 'object',
  properties: {
    id: BaseSchema.properties.id,
  },
  required: ['id'],
};

const CreateSchema = {
  type: 'object',
  properties: {
    name: BaseSchema.properties.name,
    nick_name: BaseSchema.properties.nick_name,
    pass: BaseSchema.properties.pass,
    email: BaseSchema.properties.email,
  },
  required: ['name', 'nick_name', 'pass', 'email'],
};

const UpdateSchema = {
  type: 'object',
  optionalProperties: {
    name: BaseSchema.properties.name,
    nick_name: BaseSchema.properties.nick_name,
    pass: BaseSchema.properties.pass,
    email: BaseSchema.properties.email,
  },
};

const DeleteSchema = {
  ...GetSchema,
};

const RecoverySchema = {
  type: 'object',
  properties: {
    recovery_token: BaseSchema.properties.recovery_token,
  },
  optionalProperties: {
    id: BaseSchema.properties.id,
  },
  required: ['recovery_token'],
};

export const UserSchemas = {
  base: BaseSchema,
  get: GetSchema,
  create: CreateSchema,
  update: UpdateSchema,
  delete: DeleteSchema,
  recovery: RecoverySchema,
};

// Inferred types

type User = JTDDataType<typeof BaseSchema>;

type GetUser = JTDDataType<typeof GetSchema>;

type CreateUser = JTDDataType<typeof CreateSchema>;

type UpdateUser = JTDDataType<typeof UpdateSchema>;

type DeleteUser = JTDDataType<typeof DeleteSchema>;

type RecoveryUser = JTDDataType<typeof RecoverySchema>;

export type UserTypes = {
  base: User,
  get: GetUser,
  create: CreateUser,
  update: UpdateUser,
  delete: DeleteUser,
  recovery: RecoveryUser,
}

// Use example

const userTest: User = {
  id: 1,
  name: 'anobject',
  nick_name: 'nick',
  pass: '13345',
  email: 'some@email.com',
  date_up: new Date(),
  recovery_token: 'somerecovery',
  status_id: 12,
};

const userUpdateTest: UpdateUser = {
  name: 'anobject',
};

console.log(userTest, userUpdateTest);
