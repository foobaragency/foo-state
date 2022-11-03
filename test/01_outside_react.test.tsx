import React from "react"

import { render, fireEvent, screen, waitFor } from "@testing-library/react"

import { Counter } from "../examples/01_outside_react/src/Counter"

import "@testing-library/jest-dom"

jest.useFakeTimers()

describe("Outside react:", () => {
  test("should have initial value of 0 ", async () => {
    render(<Counter />)

    expect(screen.getByText("0")).toBeInTheDocument()
  })

  test("should have value of 10000 after timeout", async () => {
    render(<Counter />)

    jest.runAllTimers()

    await waitFor(() => expect(screen.getByText("10000")).toBeInTheDocument())
  })

  test("clicking the '+' button increments the state by 1", async () => {
    render(<Counter />)

    jest.runAllTimers()

    fireEvent.click(screen.getByText("+"))
    fireEvent.click(screen.getByText("+"))

    await waitFor(() => expect(screen.getByText("10002")).toBeInTheDocument())
  })

  test("cliking the '-' button decrements the state by 1", async () => {
    render(<Counter />)

    jest.runAllTimers()

    fireEvent.click(screen.getByText("-"))
    fireEvent.click(screen.getByText("-"))

    await waitFor(() => expect(screen.getByText("9998")).toBeInTheDocument())
  })
})
