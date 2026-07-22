# PRD — Minimal Budget Tracker

## Problem Statement
People want a fast, no-friction way to log money in and out and see
their running balance, without setting up an account or configuring
budget categories.

## Users
- Primary: a single user tracking their own personal income/expenses,
  on one device, with no login.
- Out of scope: multi-user households, shared/split expenses,
  cross-device sync.

## Success Metric
A user can add a transaction (income or expense) and see their updated
running balance in under 10 seconds, with zero setup steps before the
first transaction.

## Functional Requirements
- [ ] Add a transaction: amount, type (income/expense), description,
      date (defaults to today).
- [ ] List all transactions, most recent first.
- [ ] Show a running balance (total income − total expenses).
- [ ] Edit an existing transaction.
- [ ] Delete a transaction.
- [ ] Empty state when there are no transactions yet.
- [ ] Data persists across page reloads (browser local storage).

## Non-Functional Requirements
- [ ] Works entirely client-side — no backend/database required for MVP.
- [ ] Usable on mobile-width viewports (responsive layout).
- [ ] Page loads and is interactive in under 2 seconds on a typical
      connection.

## Assumptions
- [ ] Single device, single browser — data loss on cleared storage is
      acceptable for MVP.
- [ ] No currency/locale switching — one currency (assume USD unless
      told otherwise) for MVP.

## Out of Scope (MVP)
- [ ] User accounts / authentication
- [ ] Multi-device sync or a real database
- [ ] Budget categories or spending limits
- [ ] Recurring transactions
- [ ] Charts/analytics beyond the running balance
