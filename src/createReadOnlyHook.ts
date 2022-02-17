import { useEffect, useState } from "react"

import { Observable } from "./Observable"

export function createReadOnlyHook<TState, TPartial>(
  state$: Observable<TState>,
  project: (state: TState) => TPartial
) {
  return () => {
    const [state, setState] = useState(project(state$.value))

    useEffect(() => {
      const subscription = state$.subscribe(state => setState(project(state)))

      return () => subscription.unsubscribe()
    }, [])

    return state
  }
}
