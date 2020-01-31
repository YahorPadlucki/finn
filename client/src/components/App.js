import React, {useEffect, useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import BottomBar from "./BottomBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";
import {ACCOUNTS, CATEGORIES} from "./utils/types";
import fetchData from "./api/serverApi";

const App = () => {

    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedInfoBlock, setSelectedInfoBlock] = useState(2);


    const onTabButtonClicked = (selectedButtonIndex) => {
        setSelectedInfoBlock(selectedButtonIndex);
        console.log(selectedButtonIndex)
    };


    useEffect(() => {
        // component did mount
        console.log("did mount")
        fetchInitData();

    }, []);

    async function fetchInitData() {
        const accounts = await fetchDataType(ACCOUNTS, setAccounts);
        setSelectedAccount(accounts[0]);

        fetchDataType(CATEGORIES, setCategories);
    }

    async function fetchDataType(type, setFunction) {
        const result = await fetchData(type);
        setFunction(result);
        return result;
    }

    const onAccountChanged = (selectedAccountName) => {
        setSelectedAccount(accounts.find(el => el.name === selectedAccountName));
    };

    const renderInfoBlock = () => {
        switch (selectedInfoBlock) {
            case 0:
                return <Balance/>;
            case 1:
                return <Expenses/>;
            case 2:
                return <AddTransaction accounts={accounts.map(account => account.name)}
                                       categories={categories.map(category => category.name)}
                                       selectedAccount={selectedAccount.name}
                                       onAccountChanged={onAccountChanged}/>;
            case 3:
                return <History/>;
            default:
                return null;
        }

    };


    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <BalanceHeader account={selectedAccount.name}
                           balance={selectedAccount.balance}/>
            {renderInfoBlock()}
            <BottomBar
                selectedButtonIndex={selectedInfoBlock}
                onButtonClicked={onTabButtonClicked}/>
        </div>
    );

};


export default App;