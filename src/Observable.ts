/**
 * Inspired by rxjs BehaviorSubject
 * https://rxjs.dev/api/index/class/BehaviorSubject
 */

import { isBrowser } from "./isBrowser"

export class Observable<S> {
  private static stateIndex = 0

  private static eventOptions: AddEventListenerOptions = {
    capture: false,
    once: false,
    passive: true,
  }

  private readonly eventName = `${Observable.stateIndex++}-global-state-change`

  constructor(private _value: S) {}

  get value() {
    return this._value
  }

  next(value: S) {
    if (value === this._value) {
      return
    }

    this._value = value

    if (isBrowser()) {
      window.dispatchEvent(new Event(this.eventName))
    }
  }

  subscribe(subscriber: (value: S) => void) {
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
