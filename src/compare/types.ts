export type Comparer<T> = (a: T, b: T) => number;

export enum Order {
  Asc,
  Desc
}
