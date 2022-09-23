import { Store } from '../../base/data';

export const getRepoMock = jest.fn();
const undefineProp = jest.fn();

export const StoreMock: Store = {
  getRepo: getRepoMock,
  initSource: undefineProp,
  init: undefineProp,
  rawQuery: undefineProp,
  quit: undefineProp,
};
