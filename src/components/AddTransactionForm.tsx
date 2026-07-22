"use client";

import { FormEvent, useState } from "react";
import { addTransaction, Transaction, TransactionType } from "@/lib/transactions";
import styles from "./AddTransactionForm.module.css";

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

interface AddTransactionFormProps {
  onAdded?: (transaction: Transaction) => void;
}

export function AddTransactionForm({ onAdded }: AddTransactionFormProps) {
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayISODate);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const parsedAmount = Number(amount);
    if (!amount || !(parsedAmount > 0)) {
      setError("Enter an amount greater than $0.");
      return;
    }

    const saved = addTransaction({
      amount: parsedAmount,
      type,
      description,
      date,
    });

    setError(null);
    setAmount("");
    setDescription("");
    setDate(todayISODate());
    onAdded?.(saved);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.seg} role="group" aria-label="Transaction type">
        <button
          type="button"
          className={type === "income" ? styles.segBtnOn : styles.segBtn}
          aria-pressed={type === "income"}
          onClick={() => setType("income")}
        >
          Income
        </button>
        <button
          type="button"
          className={type === "expense" ? styles.segBtnOn : styles.segBtn}
          aria-pressed={type === "expense"}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
      </div>

      <div className={styles.field}>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          className={styles.amountInput}
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          placeholder="$0.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.saveBtn}>
        Save transaction
      </button>
    </form>
  );
}
