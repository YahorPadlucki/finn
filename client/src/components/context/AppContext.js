import React, {createContext} from 'react'

const AppContext = createContext({
    accounts: ['1', '2'],
    transactions: ["1", "1"],
    categories: ["1"],
    isLoaded: false,

    allTransactionsLoaded: false,
    showMoreTransactionsClicked: () => {

    }
});

export default AppContext