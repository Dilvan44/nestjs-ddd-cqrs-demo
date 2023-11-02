export type ExcludedPartial<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : Partial<T[P]>;
};
