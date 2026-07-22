import { beforeEach, describe, expect, it } from "vitest";
import { addTransaction, getTransactions, getTransactionsSortedByRecency } from "./transactions";

beforeEach(() => {
  localStorage.clear();
});

describe("transactions storage", () => {
  it("starts empty", () => {
    expect(getTransactions()).toEqual([]);
  });

  it("adds a transaction and persists it", () => {
    const saved = addTransaction({
      amount: 12.5,
      type: "expense",
      description: "Lunch",
      date: "2026-07-22",
    });

    expect(saved.id).toBeTruthy();
    expect(getTransactions()).toEqual([saved]);
  });

  it("persists across separate reads (survives reload)", () => {
    addTransaction({
      amount: 3200,
      type: "income",
      description: "Paycheck",
      date: "2026-07-22",
    });

    const stored = JSON.parse(localStorage.getItem("budget-tracker:transactions") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].description).toBe("Paycheck");
  });

  it("assigns unique ids to each transaction", () => {
    const a = addTransaction({ amount: 10, type: "expense", description: "A", date: "2026-07-22" });
    const b = addTransaction({ amount: 20, type: "expense", description: "B", date: "2026-07-22" });
    expect(a.id).not.toBe(b.id);
  });
});

describe("getTransactionsSortedByRecency", () => {
  it("orders by date descending", () => {
    addTransaction({ amount: 1, type: "expense", description: "Oldest", date: "2026-07-18" });
    addTransaction({ amount: 2, type: "expense", description: "Newest", date: "2026-07-22" });
    addTransaction({ amount: 3, type: "expense", description: "Middle", date: "2026-07-20" });

    expect(getTransactionsSortedByRecency().map((t) => t.description)).toEqual([
      "Newest",
      "Middle",
      "Oldest",
    ]);
  });

  it("for same-day entries, shows the most recently added first", () => {
    addTransaction({ amount: 1, type: "expense", description: "Added first", date: "2026-07-22" });
    addTransaction({ amount: 2, type: "expense", description: "Added second", date: "2026-07-22" });

    expect(getTransactionsSortedByRecency().map((t) => t.description)).toEqual([
      "Added second",
      "Added first",
    ]);
  });
});
