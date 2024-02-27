/**
 * Any non-nullish value
 */
// Avoids using `{}` / `NonNullable<unknown>`
export type NonNullish = boolean | number | bigint | string | symbol | object;
