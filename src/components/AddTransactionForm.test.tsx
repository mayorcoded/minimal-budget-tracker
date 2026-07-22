import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AddTransactionForm } from "./AddTransactionForm";
import { getTransactions } from "@/lib/transactions";

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

beforeEach(() => {
  localStorage.clear();
});

describe("AddTransactionForm", () => {
  it("defaults to expense selected and today's date", () => {
    render(<AddTransactionForm />);
    expect(screen.getByRole("button", { name: /expense/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /income/i })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByLabelText(/date/i)).toHaveValue(todayISODate());
  });

  it("rejects a zero or missing amount without saving", async () => {
    const user = userEvent.setup();
    render(<AddTransactionForm />);

    await user.click(screen.getByRole("button", { name: /save transaction/i }));

    expect(await screen.findByText(/enter an amount/i)).toBeInTheDocument();
    expect(getTransactions()).toHaveLength(0);
  });

  it("saves a valid transaction and resets the form", async () => {
    const user = userEvent.setup();
    const onAdded = vi.fn();
    render(<AddTransactionForm onAdded={onAdded} />);

    await user.click(screen.getByRole("button", { name: /income/i }));
    await user.type(screen.getByLabelText(/amount/i), "3200");
    await user.type(screen.getByLabelText(/description/i), "Paycheck");
    await user.click(screen.getByRole("button", { name: /save transaction/i }));

    const saved = getTransactions();
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ amount: 3200, type: "income", description: "Paycheck" });
    expect(onAdded).toHaveBeenCalledWith(saved[0]);
    expect(screen.getByLabelText(/amount/i)).toHaveValue(null);
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
  });
});
