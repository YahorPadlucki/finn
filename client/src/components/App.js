import React, {useEffect, useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import NavigationBar from "./NavigationBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";
import {ACCOUNTS, CATEGORIES, TRANSACTIONS, INCOME_CATEGORIES, SPEND_TYPE, INCOME_TYPE} from "./api/types";
import {deleteTransaction, fetchData, patchAccounts, patchTransaction, postTransaction} from "./api/serverApi";
import AppContext from "./context/AppContext"
import ApiContext from "./context/ApiContext"
import './popup/Modal.css'

const App = () => {

    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [latestTransactions, setLatestTransactions] = useState([]);
    const [historyTransactions, setHistoryTransactions] = useState([]);

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [selectedIncomeCategoryName, setSelectedIncomeCategoryName] = useState('');

    const [selectedInfoBlock, setSelectedInfoBlock] = useState(2);
    const [isLoaded, setIsLoaded] = useState(false);

    const [loadTransactionsLimit, setLoadTransactionsLimit] = useState(10);
    const [isAllTransactionsLoaded, setIsAllTransactionsLoaded] = useState(false);


    const onTabButtonClicked = (selectedButtonIndex) => {
        setSelectedInfoBlock(selectedButtonIndex);
        console.log(selectedButtonIndex)
    };


    useEffect(() => {
        // component did mount
        console.log("did mount")
        fetchInitData();

    }, []);

    useEffect(() => {
        // component did mount
        console.log("loadTransactionsLimit changed")
        fetchLatestTransactions();

    }, [loadTransactionsLimit]);

    async function fetchInitData() {

        const accounts = await fetchData(ACCOUNTS);
        if (accounts) {
            setAccounts(accounts);
            setSelectedAccount(accounts[0]);
        }


        const categories = await fetchData(CATEGORIES);
        if (categories) {
            setCategories(categories);
            setSelectedCategoryName(categories[0].name);
        }

        const incomeCategories = await fetchData(INCOME_CATEGORIES);
        if (incomeCategories) {
            setIncomeCategories(incomeCategories);
            setSelectedIncomeCategoryName(incomeCategories[0].name);
            console.log("init income " + incomeCategories[0].name)
        }


        await fetchLatestTransactions();
        setIsLoaded(true);
    }

    const fetchLatestTransactions = async () => {

        const newTransactions = await fetchData(TRANSACTIONS + `?_sort=id&_order=desc&_page=1&_limit=${loadTransactionsLimit}`);
        if (newTransactions) {

            setIsAllTransactionsLoaded((newTransactions.length === latestTransactions.length) || (newTransactions.length < loadTransactionsLimit));
            //TODO case with first load
            setLatestTransactions(newTransactions);
        } else {
            await fetchLatestTransactions();
        }

    };

    const fetchHistoryTransactions = async (month, year) => {

        console.log("fetch history " + month)
        console.log("fetch history " + year)
        const newTransactions = await fetchData(TRANSACTIONS + `?_sort=id&_order=desc&year=${year}&month=${month}`);
        if (newTransactions) {
            setHistoryTransactions(newTransactions);
        } else {
            await fetchHistoryTransactions();
        }

    };


    const loadMoreTransactions = () => {

        setLoadTransactionsLimit(loadTransactionsLimit + 10);

    };


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
                //TODO: selected income category (props and use effect?)
                return <AddTransaction
                    selectedAccountName={selectedAccount.name}
                    selectedCategoryName={selectedCategoryName}
                    onAccountChanged={onAccountChanged}
                    selectedIncomeCategoryName={selectedIncomeCategoryName}
                    isLoaded={isLoaded}
                />;
            case 3:
                return <History itemsToShow={10}
                                isHistoryTab={true}/>;
            default:
                return null;
        }

    };

    const addTransaction = async (transactionData) => {
        setIsLoaded(false);

        const postResponse = await postTransaction(transactionData);
        selectedAccount.balance -= transactionData.total;

        await patchAccounts(selectedAccount);
        await fetchLatestTransactions();
        setIsLoaded(true);
        return postResponse;


    };

    const addIncomeTransaction = async (transactionData) => {
        setIsLoaded(false);

        const postResponse = await postTransaction(transactionData);
        selectedAccount.balance += transactionData.total;

        await patchAccounts(selectedAccount);
        await fetchLatestTransactions();
        setIsLoaded(true);
        return postResponse;


    };

    const editSpendTransaction = async function (oldData, newData) {
        if (oldData.account === newData.account) {
            const deltaAmount = oldData.total - newData.total;
            const acc = accounts.filter(acc => acc.name === oldData.account)[0];
            acc.balance += deltaAmount;
            await patchAccounts(acc);

        } else {

            const oldAcc = accounts.filter(acc => acc.name === oldData.account)[0];
            oldAcc.balance += newData.total;

            const newAcc = accounts.filter(acc => acc.name === newData.account)[0];
            newAcc.balance -= newData.total;

            await patchAccounts(oldAcc);
            await patchAccounts(newAcc);
        }

        await patchTransaction(newData);
    };

    const editIncomeTransaction = async function (oldData, newData) {
        if (oldData.account === newData.account) {
            const deltaAmount = oldData.total - newData.total;
            const acc = accounts.filter(acc => acc.name === oldData.account)[0];
            acc.balance += deltaAmount;
            await patchAccounts(acc);

        }
        await patchTransaction(newData);

    };

    const editTransaction = async (oldData, newData) => {
        if (oldData.type === SPEND_TYPE) {
            await editSpendTransaction(oldData, newData);
        }

        if (oldData.type === INCOME_TYPE) {
            await editIncomeTransaction(oldData, newData);
        }

        await fetchLatestTransactions();
        await fetchHistoryTransactions(oldData.year, oldData.month);
    };

    const removeTransaction = async (transaction) => {
        setIsLoaded(false);

        await deleteTransaction(transaction.id);

        const acc = accounts.filter(acc => acc.name === transaction.account)[0];
        acc.balance += transaction.total; // to number
        await patchAccounts(acc);

        await fetchInitData();

        //TODO: not very accurate
        await fetchHistoryTransactions(transaction.year, transaction.month);
        setIsLoaded(true);

    };


    return (
        <ApiContext.Provider value={{
            editTransaction: editTransaction,
            removeTransaction: removeTransaction,
            addTransaction: addTransaction,
            addIncomeTransaction: addIncomeTransaction
        }}>
            <AppContext.Provider value={{
                accounts,
                latestTransactions,
                historyTransactions,
                categories,
                incomeCategories,
                isLoaded,
                isAllTransactionsLoaded,
                loadMoreTransactions: loadMoreTransactions,
                fetchHistoryTransactions: fetchHistoryTransactions
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