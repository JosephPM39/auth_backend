import { poolDemo } from './raw-connection';
import { config } from '../config';

if (config.env !== 'test') {
  throw Error(`Current env isn't test, current env: ${config.env}`);
}

test('Test pool connection to DB, to return now number day of week', async () => {
  const res = await poolDemo().then((res) => res.rows[0]);
  expect(res.now).not.toBeNull();
  expect(res.now).not.toBeUndefined();
  const date = new Date(res.now);
  expect(date.getDay()).toEqual(new Date().getDay());
});
