import { useEffect, useState } from "react"

import { Observable } from "./Observable"

export function createReadOnlyHook<TState, TPartial>(
  state$: Observable<TState>,
  project: (state: TState) => TPartial
) {
  return () => {
    const [state, setState] = useState(project(state$.initializationValue))

    useEffect(() => {
      /**
       * We use the `initialState` value and only update the state after mounting the component.
       * This helps us keep a consistent and predictable state between server and client rendering
       *  consequently avoiding a possible hydration mismatch.
       */
       const stateValueAfterMount = project(state$.value)

       if (state !== stateValueAfterMount) {
         setState(stateValueAfterMount)
       }

      const subscription = state$.subscribe(observedState => setState(project(observedState)))

      return () => subscription.unsubscribe()
    }, [])

    return state
  }
}
