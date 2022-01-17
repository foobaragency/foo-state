import React from "react"
import { createGlobalState } from "@foobar-agency/react-global-state"

type Person = {
  firstName: string
  lastName: string
  age: number
}

const { useGlobalState } = createGlobalState<Person>({
  firstName: "John",
  lastName: "Doe",
  age: 43,
})

export const Profile = () => {
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
