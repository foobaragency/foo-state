/**
 * Inspired by rxjs BehaviorSubject
 * https://rxjs.dev/api/index/class/BehaviorSubject
 */

import { isBrowser } from "./isBrowser"

export class Observable<TState> {
  private static stateIndex = 0

  private static eventOptions: AddEventListenerOptions = {
    capture: false,
    once: false,
    passive: true,
  }

  private readonly eventName = `${Observable.stateIndex++}-global-state-change`

  constructor(private _value: TState) {}

  get value() {
    return this._value
  }

  next(value: TState) {
    if (value === this._value) {
      return
    }

    this._value = value

    if (isBrowser()) {
      window.dispatchEvent(new Event(this.eventName))
    }
  }

  subscribe(subscriber: (value: TState) => void) {
    const eventListener = () => subscriber(this._value)
    const eventName = this.eventName

    window.addEventListener(eventName, eventListener, Observable.eventOptions)

    function unsubscribe() {
      window.removeEventListener(
        eventName,
        eventListener,
        Observable.eventOptions
      )
    }

    return { unsubscribe }
  }
}
