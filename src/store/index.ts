import { Connection } from './controller';
import { EntitiesADS } from './config';

export { Connection as Store } from './controller';

export const createStore = async (EntitiesORM: EntitiesADS) => {
  const obj = new Connection(EntitiesORM);
  await obj.init();
  return obj;
};
