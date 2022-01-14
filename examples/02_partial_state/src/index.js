import React from "react"
import ReactDOM from "react-dom"
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

ReactDOM.render(
  <React.StrictMode>
    <Age />
  </React.StrictMode>,
  document.getElementById("root")
)
