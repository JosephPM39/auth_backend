import { JTDDataType } from './tables.model';

// Schemas

const BaseSchema = {
  type: 'object',
  properties: {
    id: { type: 'int32' },
    name: { type: 'string', minimum: 1, maximum: 80 },
    nick_name: { type: 'string', minimum: 1, maximum: 20 },
    pass: { type: 'string', minimum: 8, maximum: 255 },
    email: { type: 'string', format: 'email', maximum: 60 },
    date_up: { type: 'timestamp', format: 'date-time', parseDate: true },
    recovery_token: { type: 'string', maximum: 255, nullable: true },
    status_id: { type: 'int32' },
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

export const Schemas = {
  base: BaseSchema,
  get: GetSchema,
  create: CreateSchema,
  update: UpdateSchema,
  delete: DeleteSchema,
  recovery: RecoverySchema,
};

// Inferred types

export type User = JTDDataType<typeof BaseSchema>;

export type GetUser = JTDDataType<typeof GetSchema>;

export type CreateUser = JTDDataType<typeof CreateSchema>;

export type UpdateUser = JTDDataType<typeof UpdateSchema>;

export type DeleteUser = JTDDataType<typeof DeleteSchema>;

export type RecoveryUser = JTDDataType<typeof RecoverySchema>;

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
