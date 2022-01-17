import React from "react"

import { render, fireEvent, screen } from "@testing-library/react"

import { Counter } from "../examples/01_outside_react/src/Counter"

import "@testing-library/jest-dom"

import { act } from "react-dom/test-utils"

describe("Outside react:", () => {
  test("should have initial value after timeout", async () => {
    const { container } = render(<Counter />)

    const count = container.querySelector("span")

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
    })

    expect(count).toHaveTextContent("10000")
  })

  test("add", async () => {
    const { container } = render(<Counter />)

    fireEvent.click(screen.getByText("+"))
    fireEvent.click(screen.getByText("+"))

    const count = container.querySelector("span")

    expect(count).toHaveTextContent("10002")
  })

  test("sub", async () => {
    const { container } = render(<Counter />)

    fireEvent.click(screen.getByText("-"))
    fireEvent.click(screen.getByText("-"))

    const count = container.querySelector("span")

    expect(count).toHaveTextContent("10000")
  })
})
