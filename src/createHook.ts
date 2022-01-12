import { SetStateAction, useEffect, useState } from "react"
import { Observable } from "./Observable"
import { SetStateOptions } from "./types"

export function createHook<T>(
  state$: Observable<T>,
  setGlobalState: (state: SetStateAction<T>, options?: SetStateOptions) => void
) {
  return () => {
    const [state, setState] = useState(state$.value)

    useEffect(() => {
      /**
       * Update the current state after mounting the component:
       * It is possible that the initial state is empty before mounting
       * if that's the case we return an empty state which is not updated
       * through the subscription during the first mounting if setGlobalState is called
       * the reason for that is we only subscribe to the state$ if the component is mounted
       */
      const stateValueAfterMount = state$.value
      state !== stateValueAfterMount && setState(stateValueAfterMount)

      const subscription = state$.subscribe(setState)

      return () => subscription.unsubscribe()

      // we don't want to rerun on state change
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [state, setGlobalState] as const
  }
}
