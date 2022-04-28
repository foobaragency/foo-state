const isFunction = (value: unknown): value is Function => typeof value === 'function'

const stateInputValueResolver = <CurrentValue, NextValue = CurrentValue>(
  currentValue: CurrentValue,
  nextValue: NextValue | ((prevState: CurrentValue) => NextValue)
): NextValue => {
  return isFunction(nextValue) ? nextValue(currentValue) : nextValue
}

export default stateInputValueResolver