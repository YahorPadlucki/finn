import React from 'react'

const TransactionsContext = React.createContext(["1","2"]);

export const TransactionsProvider = TransactionsContext.Provider;
export const TransactionsConsumer = TransactionsContext.Consumer;
export default TransactionsContext