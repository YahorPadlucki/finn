import React from 'react'

const AccountsContext = React.createContext(["1","2"]);

export const AccountsProvider = AccountsContext.Provider;
export const AccountsConsumer = AccountsContext.Consumer;
export default AccountsContext