import React from "react"

import { render, fireEvent, screen } from "@testing-library/react"

import { Person } from "../examples/03_persist_state/src/Person"

import "@testing-library/jest-dom"

describe("Persist state:", () => {
  beforeEach(() => {
    localStorage.clear()

    jest.clearAllMocks()
  })

  test("change the first name", async () => {
    render(<Person />)

    const firstName = screen.getByLabelText("First Name")

    expect(firstName).toHaveValue("John")

    fireEvent.change(firstName, { target: { value: "Joe" } })

    expect(firstName).toHaveValue("Joe")
    expect(localStorage.getItem("x-storage-key")).toMatchSnapshot()
  })
})
