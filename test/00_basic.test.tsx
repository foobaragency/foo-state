import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"

import { Counter } from "../examples/00_basic/src/Counter"

import "@testing-library/jest-dom"

describe("Basic counter:", () => {
  test("add", async () => {
    const { container } = render(<Counter />)

    fireEvent.click(screen.getByText("+"))
    fireEvent.click(screen.getByText("+"))

    const count = container.querySelector("span")

    expect(count).toHaveTextContent("2")
  })

  test("sub", () => {
    const { container } = render(<Counter />)

    fireEvent.click(screen.getByText("-"))

    const count = container.querySelector("span")

    expect(count).toHaveTextContent("1")
  })

  test("negative numbers now allowed", () => {
    const { container } = render(<Counter />)

    fireEvent.click(screen.getByText("-"))
    fireEvent.click(screen.getByText("-"))
    fireEvent.click(screen.getByText("-"))

    const count = container.querySelector("span")

    expect(count).toHaveTextContent("0")
  })
})
