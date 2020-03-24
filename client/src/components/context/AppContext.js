import React, {createContext} from 'react'

const AppContext = createContext({
    accounts: ['1', '2'],
    transactions: ["1", "1"],
    categories: ["1"]
});

export default AppContext