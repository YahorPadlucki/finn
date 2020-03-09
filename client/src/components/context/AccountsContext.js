import React, { createContext }  from 'react'

const AccountsContext = createContext({
    accounts: ['1','2'],
    onAccountChanged: (selectedAccountName) => {
    },
});

export default AccountsContext