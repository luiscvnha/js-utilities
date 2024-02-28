import { isNullish } from "../common/is-nullish";


export function typeOf(value: unknown): string {
  const type = typeof value;

  if (type === "object") {
    const match = Object.prototype.toString.call(value).match(/\s([a-zA-Z0-9_$]+)/);
    if (isNullish(match) || isNullish(match[1])) { throw new TypeError("Invalid type"); }
    return match[1].toLowerCase();
  }

  return type;
}
