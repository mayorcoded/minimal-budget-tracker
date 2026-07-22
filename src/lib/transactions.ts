export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
}

const STORAGE_KEY = "budget-tracker:transactions";

export function getTransactions(): Transaction[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as Transaction[];
}

function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function addTransaction(input: Omit<Transaction, "id">): Transaction {
  const transaction: Transaction = { ...input, id: crypto.randomUUID() };
  saveTransactions([...getTransactions(), transaction]);
  return transaction;
}

export function getTransactionsSortedByRecency(): Transaction[] {
  return getTransactions()
    .map((transaction, index) => ({ transaction, index }))
    .sort((a, b) => {
      if (a.transaction.date !== b.transaction.date) {
        return a.transaction.date < b.transaction.date ? 1 : -1;
      }
      return b.index - a.index;
    })
    .map(({ transaction }) => transaction);
}
