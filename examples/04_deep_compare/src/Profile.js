import { createGlobalState } from "@foobar-agency/react-global-state"

const initialState = {
  firstName: "John",
  lastName: "Doe",
  age: 43,
}

const { useGlobalState } = createGlobalState(initialState)

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
