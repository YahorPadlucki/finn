import React, {createContext} from 'react'

const ApiContext = createContext({
    editTransaction: (transactionData) => {
    },
    removeTransaction: (transactionData) => {
    },
    addTransaction: (transactionData) => {
    },
    //TODO: add income
});

export default ApiContext