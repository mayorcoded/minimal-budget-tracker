"use client";

import { useEffect, useState } from "react";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { getTransactionsSortedByRecency, Transaction } from "@/lib/transactions";
import styles from "./page.module.css";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // localStorage doesn't exist during SSR, so the initial read has to
    // happen post-hydration rather than as derived/lazy initial state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactions(getTransactionsSortedByRecency());
  }, []);

  function handleAdded() {
    setTransactions(getTransactionsSortedByRecency());
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.wordmark}>ledger</h1>
      </header>
      <main className={styles.main}>
        <AddTransactionForm onAdded={handleAdded} />
        <div className={styles.list}>
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
