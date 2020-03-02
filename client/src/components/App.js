import React, {useEffect, useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import NavigationBar from "./NavigationBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";
import {ACCOUNTS, CATEGORIES, TRANSACTIONS} from "./api/types";
import {fetchData} from "./api/serverApi";
import {TransactionsProvider} from "./context/TransactionsContext";

const App = () => {

    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [selectedInfoBlock, setSelectedInfoBlock] = useState(2);
    const [isLoaded, setIsLoaded] = useState(false);


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

        const accounts = await fetchDataType(ACCOUNTS);
        setAccounts(accounts);
        setSelectedAccount(accounts[0]);

        const categories = await fetchDataType(CATEGORIES,);
        setCategories(categories);
        setSelectedCategoryName(categories[0].name);

        await fetchTransactions();
        setIsLoaded(true);
    }

    const fetchTransactions = async () => {
        const transactions = await fetchDataType(TRANSACTIONS);
        transactions.sort((a, b) => (a.id < b.id) ? 1 : -1);
        setTransactions(transactions);
    };

    async function fetchDataType(type) {
        const result = await fetchData(type);
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
                                       selectedCategoryName={selectedCategoryName}
                                       onAccountChanged={onAccountChanged}
                                       onCategoryChanged={onCategoryChanged}
                                       isLoaded={isLoaded}
                                       onSuccessCallBack={fetchTransactions}
                />;
            case 3:
                return <History/>;
            default:
                return null;
        }

    };


    return (
        <TransactionsProvider value={transactions}>
            <div className="ui container"
                 style={{marginTop: '10px'}}>
                <NavigationBar
                    selectedButtonIndex={selectedInfoBlock}
                    onButtonClicked={onTabButtonClicked}/>
                <BalanceHeader account={selectedAccount.name}
                               balance={selectedAccount.balance}/>
                {renderInfoBlock()}

            </div>
        </TransactionsProvider>
    );

};


export default App;