import { SetStateAction } from "react"

import { Observable } from "./Observable"
import { isBrowser } from "./isBrowser"
import { isEqual } from "./isEqual"
import { rehydrate } from "./rehydrate"
import {
  GlobalState,
  GlobalStateOptions,
  PartialState,
  SetStateOptions,
} from "./types"
import updater from "./updater"
import { createHook } from "./createHook"
import { createReadOnlyHook } from "./createReadOnlyHook"

export const createGlobalState = <TState>(
  initialState: TState,
  options?: GlobalStateOptions
): GlobalState<TState> => {
  const state$ = new Observable<TState>(initialState)

  if (options?.persistence?.key && isBrowser()) {
    rehydrate(state$, options?.persistence)
  }

  const getGlobalState = () => state$.value

  const setGlobalState = (
    state: SetStateAction<TState>,
    options?: SetStateOptions
  ) => {
    if (options?.deepCompare) {
      if (isEqual(state$.value, state)) {
        return
      }
    }

    state$.next(updater(state$.value, state))
  }

  const useGlobalState = createHook(state$, setGlobalState)

  const useReadOnlyState = createReadOnlyHook(state$, state => state)

  const createPartialState = <TPartial>(
    project: (state: TState) => PartialState<TState, TPartial>
  ) => createReadOnlyHook<TState, TPartial>(state$, project)

  return {
    useGlobalState,
    useReadOnlyState,
    createPartialState,
    getGlobalState,
    setGlobalState,
  }
}
