import React, {createContext} from 'react'

const AppContext = createContext({
    accounts: ['1', '2'],
    latestTransactions: ["1", "1"],
    historyTransactions: [],
    categories: ["Food"],
    incomeCategories: ["Salary"],
    isLoaded: false,

    allTransactionsLoaded: false,
    isAllTransactionsLoaded: false,
    loadMoreTransactions: () => {
    },
    fetchHistoryTransactions: (year, month) => {
    },
    edit: (nameId, newName, oldName) => {
    },
    addAccount: (name) => {

    },
    addCategory: (name) => {

    }
});

export default AppContext