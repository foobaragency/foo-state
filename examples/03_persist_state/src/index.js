import React from "react"
import ReactDOM from "react-dom"
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

ReactDOM.render(
  <React.StrictMode>
    <Person />
  </React.StrictMode>,
  document.getElementById("root")
)
