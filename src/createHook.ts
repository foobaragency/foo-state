import { SetStateAction } from "react"
import { BehaviorSubject } from "rxjs"

import { createReadOnlyHook } from "./createReadOnlyHook"
import { SetStateOptions } from "./types"

export function createHook<TState>(
  state$: BehaviorSubject<TState>,
  setGlobalState: (
    state: SetStateAction<TState>,
    options?: SetStateOptions
  ) => void
) {
  const useReadOnlyState = createReadOnlyHook(state$, state => state)

  return () => {
    const state = useReadOnlyState()

    return [state, setGlobalState] as const
  }
}
