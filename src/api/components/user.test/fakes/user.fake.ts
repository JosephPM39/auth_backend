import { faker } from '@faker-js/faker';
import { plainToInstance } from 'class-transformer';
import { UserCreateDTO } from '../../user/data';

export const generateOneFake = ({ raw, id }: { raw?: boolean, id?: number }) => {
  const fakeRaw = {
    id,
    name: faker.name.fullName(),
    nickName: faker.internet.userName(),
    email: faker.internet.email(),
    pass: faker.internet.password(),
  };
  if (raw) {
    return JSON.stringify(fakeRaw);
  }

  return plainToInstance(UserCreateDTO, fakeRaw);
};
export const generateManyFakes = (
  options: {
    quantity?: number,
    raw?: boolean,
    startId?: number,
  },
) => {
  const { quantity, raw, startId } = options;
  const limit = quantity ?? 10;
  const fakes: (string | UserCreateDTO)[] = [];
  for (let i = 0; i < limit; i += 1) {
    fakes.push(generateOneFake({
      raw,
      id: i + (startId ?? 1),
    }));
  }
  return fakes;
};
