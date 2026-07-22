import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./page";

beforeEach(() => {
  localStorage.clear();
});

describe("Home", () => {
  it("renders the app shell", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /ledger/i })).toBeInTheDocument();
  });

  it("shows the empty state with no transactions", () => {
    render(<Home />);
    expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument();
  });

  it("shows a saved transaction in the list after adding it", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByLabelText(/amount/i), "42");
    await user.type(screen.getByLabelText(/description/i), "Coffee");
    await user.click(screen.getByRole("button", { name: /save transaction/i }));

    expect(await screen.findByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("-$42.00")).toBeInTheDocument();
    expect(screen.queryByText(/no transactions yet/i)).not.toBeInTheDocument();
  });
});
