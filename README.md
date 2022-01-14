# react-global-state

This package consists of simple global states made possible by observing browser events. It works well when you need to use global states in a react or next.js app.

It can be used both with Typescript or Javascript.

## ⚙️ Installation

```bash
npm install --save @foobar-agency/react-global-state
```

## 🔌 Usage

### Example 1 - using as a hook
```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = 0

const { useGlobalState } = createGlobalState(initialState)

const Counter = () => {
  const [count, setCount] = useGlobalState()

  const decrement = () => {
    /**
     * you can also use callback functions
     */
    setCount((state) => {
      if (state > 0) {
        return state - 1
      }

      return state
    })
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

### Example 2 - using outside react

```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

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

### Example 3 - Partial state hook
```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

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

### Example 4 - Persist state
```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = {
    firstName: "John",
    lastName: "Doe",
    age: 43
}

const { useGlobalState } = createGlobalState(initialState, {
  persistence: {
      key: "x-storage-key",
      // optional, can be either localStorage or sessionStorage, localStorage by default
      storage: "localStorage",
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

## Example 5 - Using deep comparison (useful for objects and arrays to prevent unnecessary re-renders)
```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

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

## Example 6 - With typescript
```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

type Person = {
  firstName: string
  lastName: string
  age: number
}

const { useGlobalState } = createGlobalState<Person>({
  firstName: "John",
  lastName: "Doe",
  age: "43" // error, should be of type number
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

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## 🏛 License

[MIT](https://choosealicense.com/licenses/mit/)