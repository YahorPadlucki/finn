import React, {useEffect, useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import NavigationBar from "./NavigationBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";
import {ACCOUNTS, CATEGORIES, TRANSACTIONS} from "./api/types";
import {deleteTransaction, fetchData, patchAccounts, patchTransaction, postTransaction} from "./api/serverApi";
import AppContext from "./context/AppContext"
import ApiContext from "./context/ApiContext"
import './popup/Modal.css'

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

        const categories = await fetchDataType(CATEGORIES);
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

    const onTransactionAdded = () => {
        //TODO: initially remove money from acc
        //if editing - then need to pass delta,
        //if changing - need to pass old acc and initial sum
        //if removing - also need to pass
    };


    const renderInfoBlock = () => {

        switch (selectedInfoBlock) {
            case 0:
                return <Balance/>;
            case 1:
                return <Expenses/>;
            case 2:
                return <AddTransaction
                    selectedAccountName={selectedAccount.name}
                    selectedCategoryName={selectedCategoryName}
                    onAccountChanged={onAccountChanged}
                    isLoaded={isLoaded}
                />;
            case 3:
                return <History/>;
            default:
                return null;
        }

    };

    const addTransaction = async (transactionData) => {
        setIsLoaded(false);

        const postResponse = await postTransaction(transactionData);
        selectedAccount.balance -= transactionData.total;

        await patchAccounts(selectedAccount);
        await fetchTransactions();
        setIsLoaded(true);
        return postResponse;


    };

    const editTransaction = async (oldData, newData) => {


        if (oldData.account === newData.account) {
            const deltaAmount = oldData.total - newData.total;
            const acc = accounts.filter(acc => acc.name === oldData.account)[0];
            acc.balance += deltaAmount;
            await patchAccounts(acc);

        } else {

        }

        await patchTransaction(newData);

        await fetchTransactions();
    };

    const removeTransaction = async (transaction) => {
        setIsLoaded(false);

        await deleteTransaction(transaction.id);

        const acc = accounts.filter(acc => acc.name === transaction.account)[0];
        acc.balance += transaction.total; // to number
        await patchAccounts(acc);

        await fetchInitData();
        setIsLoaded(true);

    };


    return (
        <ApiContext.Provider value={{
            editTransaction: editTransaction,
            removeTransaction: removeTransaction,
            addTransaction: addTransaction
        }}>
            <AppContext.Provider value={{
                accounts,
                transactions,
                categories,
                isLoaded
            }}>
                <div className="ui container"
                     style={{marginTop: '10px'}}>
                    <NavigationBar
                        selectedButtonIndex={selectedInfoBlock}
                        onButtonClicked={onTabButtonClicked}/>
                    <BalanceHeader account={selectedAccount.name}
                                   balance={selectedAccount.balance}/>
                    {renderInfoBlock()}

                </div>
            </AppContext.Provider>
        </ApiContext.Provider>
    );

};


export default App;