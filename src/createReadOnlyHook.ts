import { useEffect, useState } from "react"

import { Observable } from "./Observable"

export function createReadOnlyHook<TState, TPartial>(
  state$: Observable<TState>,
  project: (state: TState) => TPartial
) {

  // We want to set the value as-is and avoid React resolving in case it is a function
  /**
   * If the value passed by the user is a function, we are already resolving it previously.
   * Therefore, we want to set the value as is, and thus, we wrap it in a callback so React resolved to our value.
   */
  const generateProjectedValueCallback = (value: TState) => {
    const projectedValue = project(value)
    const projectedValueCallback = () => projectedValue

    return projectedValueCallback
  }

  return () => {
    const initialValueCallback = generateProjectedValueCallback(state$.initializationValue)
    const [state, setState] = useState(initialValueCallback)

    useEffect(() => {
      /**
       * We use the `initializationValue` and only update the state after mounting the component.
       * This helps us keep a consistent and predictable state between server and client rendering
       *  consequently avoiding a possible hydration mismatch.
       */
      const stateValueAfterMountCallback = generateProjectedValueCallback(state$.value)
      setState(stateValueAfterMountCallback)

      const subscription = state$.subscribe(observedState => {
        const nextValueCallback = generateProjectedValueCallback(observedState)
        setState(nextValueCallback)
      })

      return () => subscription.unsubscribe()
    }, [])

    return state
  }
}
