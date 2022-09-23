import { Repository } from 'typeorm';
import { UserModel } from '../../user/data';

export const saveMock = jest.fn();
export const findMock = jest.fn();
export const updateMock = jest.fn();
export const deleteMock = jest.fn();

export const repoMocked: Pick<Repository<UserModel>, 'save' | 'find' | 'update' | 'delete'> = {
  save: saveMock,
  find: findMock,
  update: updateMock,
  delete: deleteMock,
};
