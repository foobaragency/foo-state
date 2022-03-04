import { createGlobalState } from "foo-state"

const initialState = 0

const { useGlobalState } = createGlobalState(initialState)

export const Counter = () => {
  const [count, setCount] = useGlobalState()

  const decrement = () => {
    /**
     * using a callback
     * to prevent negative numbers
     */
    setCount(state => {
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
