import { UserCreateDTO } from '../../user/data';
import { generateManyFakes, generateOneFake } from './user.fake';

describe('Testing fake user generator', () => {
  const truthyBaseExpects = (fake: UserCreateDTO) => {
    expect(fake).toBeTruthy();
    expect(fake.name).toBeTruthy();
    expect(fake.pass).toBeTruthy();
    expect(fake.nickName).toBeTruthy();
    expect(fake.email).toBeTruthy();
  };

  test('Test generate one user fake', () => {
    const fake = generateOneFake({}) as UserCreateDTO;
    truthyBaseExpects(fake);
    expect(fake.id).toBeFalsy();
  });

  test('Test generate one user fake with id', () => {
    const fake = generateOneFake({ id: 1 }) as UserCreateDTO;
    truthyBaseExpects(fake);
    expect(fake.id).toBeTruthy();
    expect(fake.id).toBe(1);
  });

  test('Test generate many user fake', () => {
    const fake = generateManyFakes({}) as UserCreateDTO[];
    expect(Array.isArray(fake)).toBeTruthy();
    expect(fake.length).toBe(10);
    truthyBaseExpects(fake[0]);
  });

  test('Test generate many user fake with id=1 and quantity = 1', () => {
    const fake = generateManyFakes({ startId: 1, quantity: 1 }) as UserCreateDTO[];
    expect(Array.isArray(fake)).toBeTruthy();
    expect(fake.length).toBe(1);
    expect(fake[0].id).toBe(1);
    truthyBaseExpects(fake[0]);
  });
});
