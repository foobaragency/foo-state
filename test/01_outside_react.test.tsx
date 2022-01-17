import React from "react"

import { render, fireEvent, screen, waitFor } from "@testing-library/react"

import { Counter } from "../examples/01_outside_react/src/Counter"

import "@testing-library/jest-dom"

describe("Outside react:", () => {
  test("should have initial value after timeout", async () => {
    const { container } = render(<Counter />)

    const count = container.querySelector("span")

    await waitFor(
      () => {
        expect(count).toHaveTextContent("10000")
      },
      { timeout: 2000 }
    )
  })

  test("add", async () => {
    const { container } = render(<Counter />)

    const count = container.querySelector("span")

    await waitFor(
      () => {
        expect(count).toHaveTextContent("10000")
      },
      { timeout: 2000 }
    )

    fireEvent.click(screen.getByText("+"))
    fireEvent.click(screen.getByText("+"))

    expect(count).toHaveTextContent("10002")
  })

  test("sub", async () => {
    const { container } = render(<Counter />)

    const count = container.querySelector("span")

    await waitFor(
      () => {
        expect(count).toHaveTextContent("10000")
      },
      { timeout: 2000 }
    )

    fireEvent.click(screen.getByText("-"))
    fireEvent.click(screen.getByText("-"))

    expect(count).toHaveTextContent("9998")
  })
})
