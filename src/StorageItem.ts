/* eslint-disable no-console */

import stringify from "safe-stable-stringify"

import { isBrowser } from "./isBrowser"

export class StorageItem<T> {
  constructor(
    public readonly key: string,
    public readonly storage: Storage = globalThis.localStorage
  ) {}

  get(): T | undefined {
    if (!isBrowser()) {
      return
    }
    try {
      const value = this.storage.getItem(this.key)
      if (value) {
        return JSON.parse(value) as T
      }
    } catch (error) {
      console.error(error)
    }
  }

  set(value: T): void {
    if (!isBrowser()) {
      return
    }
    try {
      const json = stringify(value)
      this.storage.setItem(this.key, json)
    } catch (error) {
      console.error(error)
    }
  }

  remove(): void {
    if (!isBrowser()) {
      return
    }
    try {
      this.storage.removeItem(this.key)
    } catch (error) {
      console.error(error)
    }
  }
}
