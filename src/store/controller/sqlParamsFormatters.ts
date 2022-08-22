import { CreateData, UpdateData, MultipleId } from '../model';

export enum SqlParamsFormats {
  onlyParams = '$1, $2, ...$N',
  namedParams = 'key1 = $1, ...keyN = $N',
  onlyNames = 'Key1, Key2, ...KeyN',
}

export enum SqlEncloseFormats {
  none = '',
  parenthesis = '()',
  brakets = '[]',
}

type paramsFromatsOptions = {
  param: number,
  name: string,
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

interface bspOptions {
  object?: CreateData | UpdateData | MultipleId,
  paramsFormat?: SqlParamsFormats,
  encloseFormat?: SqlEncloseFormats,
  startIn?: number,
}

type bspRes = {
  keys: string,
  length: number,
  startIn: number,
  endIn: number,
  firstKey: string,
  lastKey: string,
};

const buildData = (object: bspOptions['object']): {
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
  if (format === SqlParamsFormats.onlyParams) {
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

export const buildSqlParams = ({
  object,
  paramsFormat = SqlParamsFormats.onlyParams,
  encloseFormat = SqlEncloseFormats.parenthesis,
  startIn = 1,
}: bspOptions): bspRes | null => {
  if (!object) {
    return null;
  }
  const data = buildData(object);
  const paramFormatFunction = determineFormat(paramsFormat);
  const encloseFormatFunction = determineEncloseFormat(encloseFormat);

  const params = data.keys.map((key, index) => paramFormatFunction({
    name: key,
    param: index + startIn,
  }));
  const keys = encloseFormatFunction(params.join(', '));

  return {
    keys,
    length: params.length,
    startIn,
    endIn: params.length + startIn - 1,
    firstKey: params[0],
    lastKey: params[params.length - 1],
  };
};

export const idToArray = (id?: MultipleId) => {
  if (!id) {
    return [];
  }
  if (Array.isArray(id)) {
    return id;
  }
  return [id];
};
