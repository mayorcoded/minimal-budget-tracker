import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.wordmark}>ledger</h1>
      </header>
    </div>
  );
}
