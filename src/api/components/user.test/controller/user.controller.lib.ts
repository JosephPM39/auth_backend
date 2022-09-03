import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { StatusModel } from '../..';
import { config } from '../../../../store/config';
import { UserController } from '../../user/controller';
import { Store, UserModel } from '../../user/data';
import { generateManyFakes, generateOneFake } from '../fakes';
import * as envConfig from '../../../config';
import { IUserCreateDTO, UserCreateDTO } from '../../user/data/dto/user.dto';
import '../../../../test.config/specs';

if (envConfig.default.env !== 'test') {
  throw Error(`Current env isn't test, current env: ${envConfig.default.env}`);
}

type mode = 'e2e' | 'unit' | 'integration';

const unit = (mode: mode) => mode === 'unit';
const integration = (mode: mode) => mode === 'integration';
const e2e = (mode: mode) => mode === 'e2e';
const unitOrIntegration = (mode: mode) => unit(mode) || integration(mode);

const generateMocks = () => {
  const saveMock = jest.fn();
  const findMock = jest.fn();

  const repoMock: Pick<Repository<UserModel>, 'save' | 'find'> = {
    save: saveMock,
    find: findMock,
  };

  const getRepoMock = jest.fn();
  const undefineProp = jest.fn();

  const StoreMock: Store = {
    getRepo: getRepoMock,
    initSource: undefineProp,
    init: undefineProp,
    rawQuery: undefineProp,
    quit: undefineProp,
  };

  return {
    saveMock,
    findMock,
    repoMock,
    getRepoMock,
    StoreMock,
  };
};

export const userTests = ({ mode }:{ mode: mode}) => {
  let mocks: ReturnType<typeof generateMocks>;
  let connection: Store;
  let user: UserController;

  beforeEach(async () => {
    if (unitOrIntegration(mode)) {
      mocks = generateMocks();
      connection = mocks.StoreMock;
      mocks.getRepoMock.mockResolvedValue(mocks.repoMock);
    }
    if (e2e(mode)) {
      connection = new Store([UserModel, StatusModel]);
    }

    user = new UserController(connection);
  });

  describe('Test Crud', () => {
    test('Testing Find Method', async () => {
      let res: UserModel[] | null | undefined;

      if (unitOrIntegration(mode)) {
        mocks.findMock.mockResolvedValue(generateManyFakes({ quantity: 1 }));
      }

      if (unit(mode)) {
        res = await user.read();
      }

      expect(res).toBeTruthy();
    });

    test('Test find one user undefined id', async () => {
      let res: UserModel[] | undefined | null;

      if (unitOrIntegration(mode)) {
        mocks.findMock.mockResolvedValue([]);
      }

      if (unit(mode)) {
        res = await user.read(12394182348712);
      }

      expect(res).toBeNull();
    });

    test('Test find one user', async () => {
      let res: UserModel[] | undefined | null;

      if (unitOrIntegration(mode)) {
        const fake = generateManyFakes({ quantity: 1, startId: 1 });
        mocks.findMock.mockResolvedValue(fake);
      }

      if (unit(mode)) {
        res = await user.read(1);
      }

      expect(res).toBeTruthy();
      if (res) {
        expect(res[0]).toBeTruthy();
        expect(res[0].id).toBe(1);
      }
    });

    test('Test create an user directly', async () => {
      let res: boolean | IUserCreateDTO | undefined;
      const fakeRaw = generateOneFake({ raw: true });
      const fake = plainToInstance(UserCreateDTO, fakeRaw);

      if (unitOrIntegration(mode)) {
        mocks.saveMock.mockResolvedValue(fakeRaw);
      }

      if (unit(mode)) {
        res = await user.create(fakeRaw);
      }

      expect(res).toBeTruthy();
      if (typeof res !== 'boolean' && res) {
        expect(res.name).toBe(fake.name);
        expect(res.pass).toBeSecretOrUndefined();
        expect(res.email).toBeSecretOrUndefined();
        expect(res.nickName).toBe(fake.name);
      }
    });
  });

  afterEach(async () => {
    if (e2e(mode)) {
      await connection.rawQuery(`DROP DATABASE ${config.dbName}`);
    }
    if (unitOrIntegration(mode)) {
      mocks.findMock.mockClear();
      mocks.saveMock.mockClear();
      mocks.getRepoMock.mockClear();
    }
    await connection.quit();
  });
};
