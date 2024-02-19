export const shallowFreeze: <T extends object>(obj: T) => Readonly<T> = Object.freeze;
