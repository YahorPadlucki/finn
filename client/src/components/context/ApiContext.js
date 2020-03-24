import React, {createContext} from 'react'

const ApiContext = createContext({
    editTransaction: (transactionData) => {
    },
    removeTransaction: (transactionData) => {
    },
    addTransaction: (transactionData) => {
    },
});

export default ApiContext