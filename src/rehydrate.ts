import { BehaviorSubject } from "rxjs"

import { StorageItem } from "./StorageItem"
import { isEqual } from "./isEqual"
import { PersistenceOptions } from "./types"

export function rehydrate<TState>(
  state$: BehaviorSubject<TState>,
  options: PersistenceOptions
) {
  const { key, type } = options
  const storageLayer =
    type === "sessionStorage"
      ? globalThis.sessionStorage
      : globalThis.localStorage

  const storage = new StorageItem<TState>(key, storageLayer)

  const storedValue = storage.get()

  if (storedValue !== undefined && !isEqual(storedValue, state$.value)) {
    state$.next(storedValue)
  }

  state$.subscribe(state => {
    storage.set(state)
  })
}
