import React, { createContext }  from 'react'

const ApiContext = createContext({
    editTransaction: (transactionData) => {
    },
    removeTransaction: (transactionData) => {
    },
});

export default ApiContext