import React from "react"

import { render, act, fireEvent, screen } from "@testing-library/react"

import { Profile } from "../examples/05_typescript/src/Profile"

import "@testing-library/jest-dom"

describe("Deep compare:", () => {
  test("should invert the names", async () => {
    const { container } = render(<Profile />)

    const firstName = container.querySelector("div p")
    const lastName = container.querySelector("div p:nth-child(2)")

    expect(firstName).toHaveTextContent("First Name: John")
    expect(lastName).toHaveTextContent("Last Name: Doe")

    act(() => fireEvent.click(screen.getByText("Click me!")))

    expect(firstName).toHaveTextContent("First Name: Doe")
    expect(lastName).toHaveTextContent("Last Name: John")
  })
})
