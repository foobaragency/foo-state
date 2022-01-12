import { StorageItem } from "./StorageItem"
import { isEqual } from "./isEqual"
import { PersistenceOptions } from "./types"
import { Observable } from "./Observable"

export function rehydrate<T>(
  state$: Observable<T>,
  options: PersistenceOptions
) {
  const { key, type } = options
  const storageLayer =
    type === "sessionStorage"
      ? globalThis.sessionStorage
      : globalThis.localStorage

  const storage = new StorageItem<T>(key, storageLayer)

  const storedValue = storage.get()

  if (storedValue !== undefined && !isEqual(storedValue, state$.value)) {
    state$.next(storedValue)
  }

  state$.subscribe(state => {
    storage.set(state)
  })
}
