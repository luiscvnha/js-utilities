export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isNullishOrEmpty(value: unknown): value is null | undefined | '' | [] {
  return value === null || value === undefined || (
    (typeof value === 'string' || (typeof value === 'object' && Array.isArray(value))) &&
    (value.length <= 0)
  );
}

export function isNullishOrWhitespace(value: unknown): value is null | undefined | '' {
  return value === null || value === undefined || (
    typeof value === 'string' && value.trim().length <= 0
  );
}

export function typeOf(value: unknown): string {
  const match = Object.prototype.toString.call(value).match(/\s([a-zA-Z0-9_$]+)/);
  if (isNullish(match) || isNullish(match[1])) { throw new TypeError(); }
  return match[1].toLowerCase();
}
