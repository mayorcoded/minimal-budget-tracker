import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TransactionList } from "./TransactionList";
import { Transaction } from "@/lib/transactions";

const transactions: Transaction[] = [
  { id: "1", amount: 3200, type: "income", description: "Paycheck", date: "2026-07-22" },
  { id: "2", amount: 86.4, type: "expense", description: "Groceries", date: "2026-07-21" },
];

describe("TransactionList", () => {
  it("shows an empty state when there are no transactions", () => {
    render(<TransactionList transactions={[]} />);
    expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument();
  });

  it("renders each transaction with description, date, and signed amount", () => {
    render(<TransactionList transactions={transactions} />);

    expect(screen.getByText("Paycheck")).toBeInTheDocument();
    expect(screen.getByText("+$3,200.00")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("-$86.40")).toBeInTheDocument();
  });

  it("renders transactions in the order given, without re-sorting", () => {
    render(<TransactionList transactions={transactions} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Paycheck");
    expect(items[1]).toHaveTextContent("Groceries");
  });
});
