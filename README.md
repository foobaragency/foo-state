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

### Example 2 - using outside react

```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = 0

const { useGlobalState, setGlobalState } = createGlobalState(initialState)

export const setInitialState = async () => {
    const result = await fetchSomeApi()

    setGlobalState(result)
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

const { usePartialState } = createGlobalState(initialState)

const Age = () => {
    const age = usePartialState(state => state.age)

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
        enabled: true,
        key: "x-storage-key",
        storage: "localStorage", // optional, ca be either localStorage or sessionStorage, localStorage by default
    }
})
```

### Example 5 - Using callbacks to update the state
```jsx

import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = 0

const { useGlobalState } = createGlobalState(initialState)

const Counter = () => {
    const [count, setCount] = useGlobalState()

    const decrement = () => {
        // preventing count to get below zero
        setCount((prevCount) => {
            if (prevCount <= 0) {
                return prevCount
            }

            return prevCount - 1;
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

## Example 6 - Using deep comparison (useful for objects and arrays to prevent unnecessary re-renders)
```jsx
import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = {
    firstName: "John",
    lastName: "Doe",
    age: 43
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
    age: "43" // error, should have type number
})
```

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## 🏛 License

[MIT](https://choosealicense.com/licenses/mit/)