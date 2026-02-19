export type NestedPath<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? K | `${K}.${NestedPath<T[K]>}` : K;
    }[keyof T & string]
  : never;

export type NestedPathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? NestedPathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export function getNestedProperty<T, P extends NestedPath<T>>(
  obj: T,
  path: P,
): NestedPathValue<T, P> | undefined {
  return path.split('.').reduce<any>((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}
