import { Transaction } from "@/lib/transactions";
import styles from "./TransactionList.module.css";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatAmount(transaction: Transaction) {
  const sign = transaction.type === "income" ? "+" : "-";
  return `${sign}${currency.format(transaction.amount)}`;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyMark}>$</div>
        <p className={styles.emptyTitle}>No transactions yet</p>
        <p className={styles.emptySub}>Add your first income or expense above to see it here.</p>
      </div>
    );
  }

  return (
    <div>
      <p className={styles.label}>Recent</p>
      <ul className={styles.list}>
        {transactions.map((transaction) => (
          <li key={transaction.id} className={styles.row}>
            <div>
              <div className={styles.description}>{transaction.description || "(no description)"}</div>
              <div className={styles.meta}>{formatDate(transaction.date)}</div>
            </div>
            <div className={transaction.type === "income" ? styles.amountPos : styles.amountNeg}>
              {formatAmount(transaction)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
