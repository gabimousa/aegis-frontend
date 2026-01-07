/* eslint-disable @typescript-eslint/no-explicit-any */
export type ArrayValuesType<
  T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any> | undefined,
> =
  T extends ReadonlyArray<any>
    ? T[number]
    : T extends ArrayLike<any>
      ? T[number]
      : T extends object
        ? T[keyof T]
        : never;
