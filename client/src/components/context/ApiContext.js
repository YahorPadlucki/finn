import React, {createContext} from 'react'

const ApiContext = createContext({
    editTransaction: (transactionData) => {
    },
    removeTransaction: (transactionData) => {
    },
    addTransaction: (transactionData) => {
    },
    addIncomeTransaction: (transactionData) => {
    },
    addTransferTransaction: (transactionData) => {
    },
});

export default ApiContext