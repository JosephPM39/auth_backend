export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeSecretOrUndefined(): R;
    }
  }
}
