import { SetStateAction } from "react"

export interface SetStateOptions {
  deepCompare?: boolean
}

export interface PersistenceOptions {
  key: string
  type?: "localStorage" | "sessionStorage"
}

export interface GlobalStateOptions {
  persistence?: PersistenceOptions
}

export interface GlobalState<TState> {
  useGlobalState: () => readonly [
    TState,
    (state: SetStateAction<TState>, options?: SetStateOptions) => void
  ]
  useReadOnlyState: () => TState
  createPartialState: <TPartial>(
    project: (state: TState) => TPartial
  ) => () => TPartial
  getGlobalState: () => TState
  setGlobalState: (
    state: SetStateAction<TState>,
    options?: SetStateOptions
  ) => void
}
