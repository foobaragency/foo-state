import { SetStateAction, useEffect, useState } from "react"

import { Observable } from "./Observable"
import { SetStateOptions } from "./types"

export function createHook<TState>(
  state$: Observable<TState>,
  setGlobalState: (
    state: SetStateAction<TState>,
    options?: SetStateOptions
  ) => void
) {
  return () => {
    const [state, setState] = useState<TState>(state$.initializationValue)

    useEffect(() => {
      /**
       * We use the `initialState` value and only update the state after mounting the component.
       * This helps us keep a consistent and predictable state between server and client rendering
       *  consequently avoiding a possible hydration mismatch.
       */
      const stateValueAfterMount = state$.value

      if (state !== stateValueAfterMount) {
        setState(stateValueAfterMount)
      }

      const subscription = state$.subscribe(setState)

      return () => subscription.unsubscribe()

      // we don't want to rerun on state change
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [state, setGlobalState] as const
  }
}
