import { SetStateAction } from "react"

const isFunction = (fn: unknown): fn is Function => typeof fn === "function"

const updater = <Value>(
  oldValue: Value,
  newValue: SetStateAction<Value>
): Value => {
  if (isFunction(newValue)) {
    return newValue(oldValue)
  }

  return newValue
}

export default updater
