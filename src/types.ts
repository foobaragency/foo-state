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

export type PartialState<TState, TPartial> = TState | TPartial

export interface GlobalState<TState> {
  useGlobalState: () => readonly [
    TState,
    (state: SetStateAction<TState>, options?: SetStateOptions) => void
  ]
  useReadOnlyState: () => PartialState<TState, TState>
  createPartialState: <TPartial>(
    project: (state: TState) => PartialState<TState, TPartial>
  ) => () => PartialState<TState, TPartial>
  getGlobalState: () => TState
  setGlobalState: (
    state: SetStateAction<TState>,
    options?: SetStateOptions
  ) => void
}
