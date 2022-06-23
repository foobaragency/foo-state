[![build](https://github.com/foobaragency/react-global-state/actions/workflows/build.yml/badge.svg)](https://github.com/foobaragency/react-global-state/actions/workflows/build.yml)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
![Total coverage](./badges/coverage-jest%20coverage.svg)
# foo-state 

This package consists of simple global states made possible by observing browser events. It works well when you need to use global states in a react or next.js app.

It can be used both with Typescript or Javascript.

## Table of contents

1. [Installation](#⚙️-installation)
2. [Examples](#🔌-examples)
    1. [Using as a hook](#1---using-as-a-hook)
    2. [Using outside React](#2---using-outside-react)
    3. [Partial state hook](#3---partial-state-hook)
    4. [Persist state](#4---persist-state)
    5. [Using deep comparison](#5---using-deep-comparison-useful-for-objects-and-arrays-to-prevent-unnecessary-re-renders)
    6. [With lazy initialization](#6---with-lazy-initialization)
    7. [Using with TypeScript](#7---with-typescript)
3. [API Reference](#api-reference)
4. [Contributing](#👥-contributing)
5. [License](#🏛-license)

## ⚙️ Installation

```bash
npm install --save foo-state
```

## 🔌 Examples

### 1 - using as a hook
<details>
  <summary>See code</summary>

  ```jsx
  import { createGlobalState } from "foo-state"

  const initialState = 0

  const { useGlobalState } = createGlobalState(initialState)

  const Counter = () => {
    const [count, setCount] = useGlobalState()

    const increment = () => {
      setCount(count + 1)
    }

    const decrement = () => {
      // you can also use callback functions
      setCount((state) => {
        if (state > 0) {
          return state - 1
        }

        return state
      })
    }

    return (
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    )
  }
  ```
</details>

### 2 - using outside react

<details>
  <summary>See code</summary>

  ```jsx
  import { createGlobalState } from "foo-state"

  const initialState = 0

  const { useGlobalState, setGlobalState } = createGlobalState(initialState)

  function setInitialState() {
    setTimeout(() => {
      setGlobalState(10_000)
    }, 2_000)
  }

  const Counter = () => {
    const [count, setCount] = useGlobalState()

    useEffect(() => {
      setInitialState()
    }, [])

    const decrement = () => {
      setCount(count - 1)
    }

    const increment = () => {
      setCount(count + 1)
    }

    return (
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    )
  }
  ```
</details>

### 3 - partial state hook

<details>
  <summary>See code</summary>

  ```jsx
  import { createGlobalState } from "foo-state"

  const initialState = {
      firstName: "John",
      lastName: "Doe",
      age: 43
  }

  const { createPartialState } = createGlobalState(initialState)

  const useAge = createPartialState(state => state.age)

  const Age = () => {
      const age = useAge()

      return (
          <div>{age}</div>
      )
  }
  ```
</details>

### 4 - persist state

<details>
  <summary>See code</summary>

  ```jsx
  import { createGlobalState } from "foo-state"

  const initialState = {
      firstName: "John",
      lastName: "Doe",
      age: 43
  }

  const { useGlobalState } = createGlobalState(initialState, {
    persistence: {
        key: "x-storage-key",
        // optional, defaults to localStorage
        // localStorage or sessionStorage
        type: "localStorage",
    }
  })

  const Person = () => {
      const [person, setPerson] = useGlobalState()

      function onChange(e){
        const {name, value} = e.target

        setPerson({
          ...person,
          [name]: value
        })
      }

      return (
          <div>
            <label>
              First Name
              <br />
            <input name="firstName" value={person.firstName} onChange={onChange} />
            </label>
            <label>
              Last Name
              <br />
            <input name="lastName" value={person.lastName} onChange={onChange} />
            </label>
            <label>
              Age
              <br />
            <input name="age" value={person.age} onChange={onChange} />
            </label>
          </div>
      )
  }
  ```
</details>

### 5 - using deep comparison (useful for objects and arrays to prevent unnecessary re-renders)

<details>
  <summary>See code</summary>

  ```jsx
  import { createGlobalState } from "foo-state"

  const initialState = {
    firstName: "John",
    lastName: "Doe",
    age: 43,
  }

  const { useGlobalState } = createGlobalState(initialState)

  const Profile = () => {
    const [state, setState] = useGlobalState()

    function invertNames() {
      const newState = {
        firstName: "Doe",
        lastName: "John",
        age: 43,
      }
      setState(newState, { deepCompare: true })
    }

    return (
      <div>
        <p>First Name: {state.firstName}</p>
        <p>Last Name: {state.lastName}</p>
        <p>Age: {state.age}</p>
        <button onClick={invertNames}>Click me!</button>
      </div>
    )
  }
  ```
</details>

### 6 - With lazy initialization

<details>
  <summary>See code</summary>

  ```jsx
  function heavyCalculation() {
    const user = {
      name: 'John',
      birthday: new Date('1995-03-15')
    }

    // let's pretend we're getting a correct age here
    const age = new Date().getFullYear() - user.birthday.getFullYear()

    return {
      name: user.name,
      age,
    }
  }


  const {useGlobalState} = createGlobalState(heavyCalculation)

  const Profile = () => {
    const [state] = useGlobalState()

    return (
      <div>
        <p>Name: {state.name}</p>
        <p>Age: {state.age}</p>
      </div>
    )
  }
  ```
</details>

### 7 - With typescript

<details>
  <summary>See code</summary>

  ```tsx
  import { createGlobalState } from "foo-state"

  type Person = {
    firstName: string
    lastName: string
    age: number
  }

  const { useGlobalState } = createGlobalState<Person>({
    firstName: "John",
    lastName: "Doe",
    // string is not assignable to type number
    age: "43"
  })

  const Profile = () => {
      const [state, setState] = useGlobalState()

      function invertNames() {
          const newState = {
              firstName: "Doe",
              lastName: "John",
              age: 43,
          }
          setState(newState, {deepCompare: true})
      }

      return (
          <div>
              <p>First Name: {state.firstName}</p>
              <p>Last Name: {state.lastName}</p>
              <p>Age: {state.age}</p>
              <button onClick={invertNames}>Click me!</button>
          </div>
      )
  }
  ```
</details>

## API Reference

### createGlobalState

```ts
createGlobalState<S>(initialState: S | () => S, options: GlobalStateOptions): GlobalState
```

This is, most probably, the only function you will need to use from this library.
#### Params
The initial state can be either a `value` or a `function` that resolves to a value. This mirrors the [`useState` API](https://reactjs.org/docs/hooks-reference.html#usestate).

The library tries to infer the type as much as possible, but you can also specify the type:

```ts
type Person = {}

const state = createGlobalState<Person>({})
```

You can always [read more about the `options` parameter for `createGlobalState`](./docs/interfaces/GlobalStateOptions.md).

#### Returned functions

+ `useGlobalState` - This react hook can be used inside any functional component to access or change the state.

+ `useReadOnlyState` - This react hook doesn't give you access to the `setState` function, instead it only returns the current state.

+ `createPartialState` - This function will return a read only react hook with a custom partial state. [See example of `createPartialState`](#3---partial-state-hook)

+ `getGlobalState` - This function returns the current state and can be used anywhere in you application, not only inside react components.[See example of `getGlobalState`](#2---using-outside-react)

+ `setGlobalState` - This function allows you to change the state and can be used anywhere in you application, not only inside react components.[See example of `setGlobalState`](#2---using-outside-react)

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## 🏛 License

[MIT](https://choosealicense.com/licenses/mit/)
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/n4bb12"><img src="https://avatars.githubusercontent.com/u/6810177?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abraham Schilling</b></sub></a><br /><a href="#design-n4bb12" title="Design">🎨</a> <a href="#mentoring-n4bb12" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/foobaragency/foo-state/commits?author=n4bb12" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!