import Ajv, { JTDDataType } from 'ajv/dist/jtd';
import addFormats from 'ajv-formats';

export interface TABLES_NAMES {
	USERS: 'users',
}

export type TableName = TABLES_NAMES[keyof TABLES_NAMES];

const ajv = new Ajv();
// Formats to extend Ajv
addFormats(ajv);

export const TableSchemaBase = {
  type: 'object',
  properties: {
    id: { type: 'int32' },
  },
  required: ['id'],
} as const;

export type TableBase = JTDDataType<typeof TableSchemaBase>

export { ajv, JTDDataType };
