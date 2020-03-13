import React, { createContext }  from 'react'

const ApiContext = createContext({
    editTransaction: (transactionData) => {
    },
});

export default ApiContext