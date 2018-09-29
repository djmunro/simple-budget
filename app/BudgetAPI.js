import { AsyncStorage } from "react-native";

export default (storageKey = "@@budget/budget-signin");
transactionKey = "@@budget/budget-transactions";

const STORAGE_KEY = "ASYNC_STORAGE_NAME_EXAMPLE17";
const CATEGORIES = "@@budget/budget-categories";

export const BudgetAPI = {
  async addTransaction(transaction) {
    return new Promise((resolve, reject) => {
      this.getTransactions()
        .then(req => JSON.parse(req))
        .then(response => {
          let transactions = response != null ? response : [];
          transactions.push(transaction);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        })
        .then(resolve());
    });
  },
  getTransactions() {
    return AsyncStorage.getItem(STORAGE_KEY);
  },
  async getCategories() {
    const categories = [
      {
        name: "Insurance",
        type: "monthly",
        budgeted: 900
      },
      {
        name: "Miscellaneous",
        type: "monthly",
        budgeted: 600
      },
      {
        name: "Groceries",
        type: "monthly",
        budgeted: 0
      },
      {
        name: "Gas",
        type: "monthly",
        budgeted: 0
      },
      {
        name: "Home Depot",
        type: "monthly",
        budgeted: 0
      },
      {
        name: "Tithe",
        type: "monthly",
        budgeted: 0
      },
      {
        name: "Dance",
        type: "annual",
        budgeted: 0
      },
      {
        name: "Christmas",
        type: "annual",
        budgeted: 0
      },
      {
        name: "Clothing",
        type: "annual",
        budgeted: 0
      }
    ];
    // AsyncStorage.setItem(CATEGORIES, JSON.stringify(categories));

    // apply transactions to categories
    const transactions = await this.getTransactions().then(req =>
      JSON.parse(req)
    );
    return await AsyncStorage.getItem(CATEGORIES).then(req =>
      JSON.parse(req).map(category => ({
        name: category.name,
        available:
          category.budgeted -
          transactions
            .filter(transaction => transaction.category == category.name)
            .reduce((a, b) => a + parseInt(b.amount), 0),
        budgeted: category.budgeted,
        type: category.type
      }))
    );
  }
};
