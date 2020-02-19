import React, {useEffect, useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import NavigationBar from "./NavigationBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";
import {ACCOUNTS, CATEGORIES} from "./utils/types";
import {fetchData} from "./api/serverApi";

const App = () => {

    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

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

        const categories = await fetchDataType(CATEGORIES, setCategories);
        setSelectedCategoryName(categories[0]);
    }

    async function fetchDataType(type, setFunction) {
        const result = await fetchData(type);
        setFunction(result);
        return result;
    }

    const onAccountChanged = (selectedAccountName) => {
        setSelectedAccount(accounts.find(el => el.name === selectedAccountName));
    };

    const onCategoryChanged = (selectedCategoryName) => {
        setSelectedCategoryName(selectedCategoryName);
    };

    const renderInfoBlock = () => {
        switch (selectedInfoBlock) {
            case 0:
                return <Balance/>;
            case 1:
                return <Expenses/>;
            case 2:
                return <AddTransaction accounts={accounts}
                                       categories={categories}
                                       selectedAccountName={selectedAccount.name}
                                       selectedCategory={selectedCategoryName.name}
                                       onAccountChanged={onAccountChanged}
                                       onCategoryChanged={onCategoryChanged}
                />;
            case 3:
                return <History/>;
            default:
                return null;
        }

    };


    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <NavigationBar
                selectedButtonIndex={selectedInfoBlock}
                onButtonClicked={onTabButtonClicked}/>
            <BalanceHeader account={selectedAccount.name}
                           balance={selectedAccount.balance}/>
            {renderInfoBlock()}

        </div>
    );

};


export default App;