import { BehaviorSubject } from "rxjs"
import { SetStateAction } from "react"

import { isBrowser } from "./isBrowser"
import { isEqual } from "./isEqual"
import { rehydrate } from "./rehydrate"
import { GlobalState, GlobalStateOptions, SetStateOptions } from "./types"
import stateInputValueResolver from "./stateInputValueResolver"
import { createHook } from "./createHook"
import { createReadOnlyHook } from "./createReadOnlyHook"

export const createGlobalState = <TState>(
  initialState: TState | (() => TState),
  options?: GlobalStateOptions
): GlobalState<TState> => {
  const initialValue = stateInputValueResolver(undefined, initialState)
  const state$ = new BehaviorSubject<TState>(initialValue)

  if (options?.persistence?.key && isBrowser()) {
    rehydrate(state$, options?.persistence)
  }

  const getGlobalState = () => state$.value

  const setGlobalState = (
    state: SetStateAction<TState>,
    options?: SetStateOptions
  ) => {
    const nextState = stateInputValueResolver(state$.value, state)

    if (options?.deepCompare) {
      if (isEqual(state$.value, nextState)) {
        return
      }
    }

    state$.next(nextState)
  }

  const useGlobalState = createHook(state$, setGlobalState)

  const useReadOnlyState = createReadOnlyHook(state$, state => state)

  const createPartialState = <TPartial>(project: (state: TState) => TPartial) =>
    createReadOnlyHook<TState, TPartial>(state$, project)

  return {
    useGlobalState,
    useReadOnlyState,
    createPartialState,
    getGlobalState,
    setGlobalState,
  }
}
