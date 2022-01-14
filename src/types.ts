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

export type PartialState<T> = Partial<T> | keyof T

export interface GlobalState<T> {
  useGlobalState: () => readonly [
    T,
    (state: SetStateAction<T>, options?: SetStateOptions) => void
  ]
  useReadOnlyState: () => PartialState<T>
  createPartialState: (
    project: (state: T) => PartialState<T>
  ) => () => PartialState<T>
  getGlobalState: () => T
  setGlobalState: (state: SetStateAction<T>, options?: SetStateOptions) => void
}
