import React from "react"

import { render } from "@testing-library/react"

import { Age } from "../examples/02_partial_state/src/Age"

import "@testing-library/jest-dom"

describe("Partial state:", () => {
  test("should have the right age", async () => {
    const { container } = render(<Age />)

    const age = container.querySelector("div")

    expect(age).toHaveTextContent("43")
  })
})
