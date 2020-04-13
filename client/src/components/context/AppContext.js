import React, {createContext} from 'react'

const AppContext = createContext({
    accounts: ['1', '2'],
    latestTransactions: ["1", "1"],
    historyTransactions: [],
    categories: ["1"],
    isLoaded: false,

    allTransactionsLoaded: false,
    isAllTransactionsLoaded: false,
    loadMoreTransactions: () => {
    },
    fetchHistoryTransactions: (year, month) => {
    }
});

export default AppContext