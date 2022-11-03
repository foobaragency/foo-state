import { useEffect } from "react"
import { createGlobalState } from "foo-state"

const initialState = 0

const { useGlobalState, setGlobalState } = createGlobalState(initialState)

function setInitialState() {
  setTimeout(() => {
    setGlobalState(10_000)
  }, 2_000)
}

export const Counter = () => {
  const [count, setCount] = useGlobalState()

  useEffect(() => {
    setInitialState()
  }, [])

  const decrement = () => {
    setCount(count => count - 1)
  }

  const increment = () => {
    setCount(count => count + 1)
  }

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}
