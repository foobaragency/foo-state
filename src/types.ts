import { SetStateAction } from "react"

export interface SetStateOptions {
  deepCompare?: boolean
}

export interface PersistenceOptions {
  enabled: boolean
  key: string
  type?: "localStorage" | "sessionStorage"
}

export interface GlobalStateOptions {
  persistence?: PersistenceOptions
}

export type PartialState<T> = Partial<T> | keyof T

export interface GlobalState<T> {
  useGlobalState: () => readonly [T, (state: SetStateAction<T>) => void]
  useReadOnlyState: () => PartialState<T>
  usePartialState: (
    project: (state: T) => PartialState<T>
  ) => () => PartialState<T>
  getGlobalState: () => T
  setGlobalState: (state: SetStateAction<T>, options?: SetStateOptions) => void
}
