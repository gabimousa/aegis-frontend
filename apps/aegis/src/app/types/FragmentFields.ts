export type FragmentFields<T> = Omit<T, ' $fragmentName' | '__typename'>;
