import React, { useEffect } from "react"
import ReactDOM from "react-dom"
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

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById("root")
)
