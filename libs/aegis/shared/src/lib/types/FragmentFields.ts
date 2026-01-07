type CleanFragment<T> =
  T extends Array<infer U>
    ? Array<CleanFragment<U>>
    : T extends object
      ? {
          [K in keyof T as K extends ' $fragmentName' | '__typename' ? never : K]: CleanFragment<
            T[K]
          >;
        }
      : T;

export type FragmentFields<T> = CleanFragment<T>;
