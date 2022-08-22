import { CreateData, UpdateData, MultipleId } from '../model';

enum SqlParamsFormats {
  onlyParam = '$1, $2, ...$N',
  namedParams = 'key1 = $1, ...keyN = $N',
  onlyNames = 'Key1, Key2, ...KeyN',
}

enum SqlEncloseFormats {
  none = '',
  parenthesis = '()',
  brakets = '[]',
}

type bspBasicOptions = {
  length: number,
  startIn?: number,
};

type bspDataObjectOptions = {
  object: CreateData | UpdateData,
  format: 'create' | 'update' | 'insert',
  startIn?: number,
};

type bspOptions = bspBasicOptions | bspDataObjectOptions;

type bspRes = {
  keys: string,
  length: number,
  startIn: number,
  endIn: number,
  firstKey: string,
  lastKey: string,
};

const isBasicOptions = (options: bspOptions): options is bspBasicOptions => {
  if ((options as bspBasicOptions).length) {
    return true;
  }
  return false;
};

interface bspOptions2 {
  object: CreateData | UpdateData | MultipleId,
  paramsFormat: SqlParamsFormats,
  encloseFormat: SqlEncloseFormats,
  startIn?: number,
}

type paramsFromatsOptions = {
  param: number,
  name: string | null
}
const paramsFormats = {
  onlyParams: ({ param }: paramsFromatsOptions) => `$${param}`,
  namedParams: ({ param, name }: paramsFromatsOptions) => `${name} = $${param}`,
  onlyNames: ({ name }: paramsFromatsOptions) => name,
};

const encloseFormats = {
  none: (str: string) => str,
  parenthesis: (str: string) => `( ${str} )`,
  brakets: (str: string) => `[ ${str} ]`,
};

const buildData = (object: bspOptions2['object']): {
      keys: string[],
      length: number,
  } => {
  if (typeof object === 'object') {
    const keys = Object.keys(object);
    return {
      keys,
      length: keys.length,
    };
  }
  if (Array.isArray(object)) {
    return {
      keys: object,
      length: object.length,
    };
  }
  return {
    keys: [`${object}`],
    length: 1,
  };
};

const determineFormat = (format: SqlParamsFormats) => {
  if (format === SqlParamsFormats.onlyParam) {
    return paramsFormats.onlyParams;
  }
  if (format === SqlParamsFormats.onlyNames) {
    return paramsFormats.onlyNames;
  }
  return paramsFormats.namedParams;
};

const determineEncloseFormat = (format: SqlEncloseFormats) => {
  if (format === SqlEncloseFormats.brakets) {
    return encloseFormats.brakets;
  }
  if (format === SqlEncloseFormats.parenthesis) {
    return encloseFormats.parenthesis;
  }
  return encloseFormats.none;
};

export const buildSqlParams2 = ({
  object,
  paramsFormat,
  encloseFormat,
  startIn = 1,
}: bspOptions2) => {
  const data = buildData(object);
  const paramFormatFunction = determineFormat(paramsFormat);
  const encloseFormatFunction = determineEncloseFormat(encloseFormat);

  const params = data.keys.map((key, index) => paramFormatFunction({
    name: key,
    param: index + startIn,
  })).join(', ');

  return encloseFormatFunction(params);
};

const generateBasicKeys = ({ length, startIn = 1 }:bspBasicOptions): bspRes => {
  const keys = [];
  for (let i = 0; i < length; i += i) {
    keys.push(`$${i + startIn}`);
  }
  // This returns keys parameters in the format: "($1, $2, ... $n)"
  return {
    keys: `( ${keys.join(', ')} )`,
    length,
    startIn,
    endIn: length + startIn - 1,
    firstKey: keys[0],
    lastKey: keys[length - 1],
  };
};

const generateDataObjectKeys = ({ object, format, startIn = 1 }: bspDataObjectOptions): bspRes => {
  const { length } = Object.keys(object);
  if (format === 'create') {
    return generateBasicKeys({ length, startIn });
  }
  const keys = Object.keys(object).map(
    (key, index) => `${key} = $${index + startIn}`,
  );
  // This returns keys parameters in the format:
  // "keyName1 = $1, keyName2 = $2, ... keyNameN = $N"
  return {
    keys: keys.join(', '),
    length,
    startIn,
    endIn: length + startIn - 1,
    firstKey: keys[0],
    lastKey: keys[length - 1],
  };
};

export const buildSqlParams = (options: bspOptions): bspRes => {
  if (isBasicOptions(options)) {
    return generateBasicKeys(options);
  }
  return generateDataObjectKeys(options);
};

// This returns keys names in the format:
// "(keyName1, keyName2, ... keyNameN)"
export const getKeyNames = (data: CreateData | UpdateData) => `( ${
  Object.keys(data).join(', ')
} )`;

export const buildSqlIdParams = (id?: MultipleId, startIn?: number) => {
  if (!id) {
    return null;
  }
  if (Array.isArray(id)) {
    return buildSqlParams({
      length: id.length,
      startIn,
    });
  }
  return buildSqlParams({
    length: 1,
    startIn,
  });
};

export const prepareId = (id?: MultipleId) => {
  if (!id) {
    return [];
  }
  if (Array.isArray(id)) {
    return id;
  }
  return [id];
};
