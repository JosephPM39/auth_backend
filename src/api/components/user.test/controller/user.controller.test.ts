import { plainToInstance } from 'class-transformer';
import { UserController } from '../../user/controller';
import { Store, UserModel } from '../../user/data';
import { generateManyFakes, generateOneFake } from '../fakes';
import * as envConfig from '../../../config';
import { UserCreateDTO, UserUpdateDTO } from '../../user/data/dto/user.dto';
import '../../../../test.config/specs';
import {
  StoreMock, getRepoMock, findMock, repoMocked, saveMock, updateMock, deleteMock,
} from '../mocks';

if (envConfig.default.env !== 'test') {
  throw Error(`Current env isn't test, current env: ${envConfig.default.env}`);
}

describe('Unit Testing UserController', () => {
  let connection: Store;
  let user: UserController;

  beforeEach(async () => {
    connection = StoreMock;
    getRepoMock.mockResolvedValue(repoMocked);
    user = new UserController(connection);
  });

  describe('Test Crud', () => {
    test('Find All', async () => {
      findMock.mockResolvedValue(generateManyFakes({ quantity: 1 }));
      const res = await user.read();
      expect(res).toBeTruthy();
    });

    test('Find one user by undefined id', async () => {
      findMock.mockResolvedValue([]);
      const res = await user.read(1283497123408);
      expect(res).toBeNull();
    });

    test('Find one user', async () => {
      const fake = generateManyFakes({ quantity: 1, startId: 1 });
      findMock.mockResolvedValue(fake);
      const res = await user.read(1);
      expect(res).toBeTruthy();
      if (res) {
        expect(res[0]).toBeTruthy();
        expect(res[0].id).toBe(1);
      }
    });

    test('Test create an user', async () => {
      const fakeRaw = generateOneFake({ raw: true });
      const buildFake = plainToInstance(UserCreateDTO, fakeRaw);
      const fake = plainToInstance(UserCreateDTO, { ...buildFake, id: 1 });
      saveMock.mockResolvedValue(fake);
      const res = await user.create(fakeRaw);
      expect(res).toBeTruthy();
      if (typeof res !== 'boolean') {
        expect(res).toBeGreaterThanOrEqual(1);
      }
    });

    test('Update an user', async () => {
      const fakeRawOld = generateOneFake({ raw: true, id: 1 });
      const fakeRawNew = generateOneFake({ raw: true, id: 1 });
      findMock.mockResolvedValue(plainToInstance(UserModel, fakeRawOld));
      saveMock.mockResolvedValue(plainToInstance(UserUpdateDTO, fakeRawNew));
      updateMock.mockResolvedValue({ affected: 1 });
      const res = await user.update(1, fakeRawNew);
      expect(res).toBeTruthy();
    });

    test('Delete an user', async () => {
      const fakeOld = generateOneFake({ id: 1 });
      findMock.mockResolvedValue(fakeOld);
      deleteMock.mockResolvedValue({ affected: 1 });
      const res = await user.delete(1);
      expect(res).toBeTruthy();
    });
  });

  afterEach(async () => {
    // await connection.rawQuery(`DROP DATABASE ${config.dbName}`);
    findMock.mockClear();
    saveMock.mockClear();
    getRepoMock.mockClear();
    await connection.quit();
  });
});
