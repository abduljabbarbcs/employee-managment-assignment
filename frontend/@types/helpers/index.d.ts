/** Omit a field / fields from an interface */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** Make a field / fields in an interface optional */
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Type may exist */
type Maybe<T> = T | undefined;

/** Type may be null */
type MaybeNull<T> = T | null;
