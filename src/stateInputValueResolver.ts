const isFunction = (value: unknown): value is Function =>
  typeof value === "function"

const stateInputValueResolver = <TState, TValue = TState>(
  currentValue: TState,
  nextValue: TValue | ((prevState: TState) => TValue)
): TValue => {
  return isFunction(nextValue) ? nextValue(currentValue) : nextValue
}

export default stateInputValueResolver
