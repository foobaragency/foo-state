import React from "react"
import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = {
  firstName: "John",
  lastName: "Doe",
  age: 43,
}

const { createPartialState } = createGlobalState(initialState)

const useAge = createPartialState(state => state.age)

export const Age = () => {
  const age = useAge()

  return <div>{age}</div>
}
