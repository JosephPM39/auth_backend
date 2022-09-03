export const toBeSecretOrUndefined = (receive: unknown) => {
  const pass = receive === undefined || receive === 'secret';
  return {
    message: () => `expect ${receive} ${pass ? 'to be \'secret\' or \'undefined\'' : 'not to be \'secret\' or \'undefined\''}`,
    pass,
  };
};
