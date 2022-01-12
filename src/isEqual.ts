import stringify from "safe-stable-stringify"

export function isEqual(value1: unknown, value2: unknown): boolean {
  return stringify(value1) === stringify(value2)
}
