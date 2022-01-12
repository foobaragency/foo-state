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

export const createGlobalState = <S>(
  initialState: S,
  options?: GlobalStateOptions
): GlobalState<S> => {
  const state$ = new Observable<S>(initialState)

  if (options?.persistence?.enabled && isBrowser()) {
    rehydrate(state$, options?.persistence)
  }

  const getGlobalState = () => state$.value

  const setGlobalState = (
    state: SetStateAction<S>,
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

  const usePartialState = (project: (state: S) => PartialState<S>) =>
    createReadOnlyHook(state$, project)

  return {
    useGlobalState,
    useReadOnlyState,
    usePartialState,
    getGlobalState,
    setGlobalState,
  }
}
