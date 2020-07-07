import React, {useEffect, useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import NavigationBar from "./NavigationBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";
import {
    ACCOUNTS,
    CATEGORIES,
    INCOME_CATEGORIES,
    INCOME_TYPE, NAMES,
    SPEND_TYPE,
    TRANSACTIONS,
    TRANSFER_TYPE
} from "./api/types";
import {deleteTransaction, fetchData, patchAccounts, patchTransaction, postTransaction} from "./api/serverApi";
import AppContext from "./context/AppContext"
import ApiContext from "./context/ApiContext"
import './popup/Modal.css'
import Settings from "./infoBlocks/Settings";

const App = () => {

    const [accounts, setAccounts] = useState([]);
    const [names, setNames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [latestTransactions, setLatestTransactions] = useState([]);
    const [historyTransactions, setHistoryTransactions] = useState([]);

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCategoryNameId, setSelectedCategoryNameId] = useState('');
    const [selectedIncomeCategoryNameId, setSelectedIncomeCategoryNameId] = useState('');

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

        const names = await fetchData(NAMES);
        setNames(names);
        const accounts = await fetchData(ACCOUNTS);
        if (accounts) {
            setAccounts(accounts);
            setSelectedAccount(accounts[0]);
        }


        const categories = await fetchData(CATEGORIES);
        if (categories) {
            setCategories(categories);
            setSelectedCategoryNameId(categories[0].nameId);
        }

        const incomeCategories = await fetchData(INCOME_CATEGORIES);
        if (incomeCategories) {
            setIncomeCategories(incomeCategories);
            setSelectedIncomeCategoryNameId(incomeCategories[0].nameId);
            console.log("init income " + incomeCategories[0].nameId)
        }


        await fetchLatestTransactions();
        setIsLoaded(true);
    }

    const getNameFromNameId = (id) => {
        return names.filter(el => el.nameId === id)[0].name;

    };

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


    const onAccountChanged = (selectedAccountNameId) => {
        setSelectedAccount(accounts.find(el => el.nameId === selectedAccountNameId));
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
                    selectedAccountNameId={selectedAccount.nameId}
                    selectedCategoryNameId={selectedCategoryNameId}
                    onAccountChanged={onAccountChanged}
                    selectedIncomeCategoryNameId={selectedIncomeCategoryNameId}
                    isLoaded={isLoaded}
                />;
            case 3:
                return <History itemsToShow={10}
                                isHistoryTab={true}/>;
            case 4:
                return <Settings/>
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

    const addTransferTransaction = async (transactionData) => {
        setIsLoaded(false);

        const postResponse = await postTransaction(transactionData);

        const fromAcc = accounts.filter(acc => acc.name === transactionData.account)[0];
        const toAcc = accounts.filter(acc => acc.name === transactionData.toAccount)[0];

        toAcc.balance += transactionData.total;
        fromAcc.balance -= transactionData.total;


        await patchAccounts(toAcc);
        await patchAccounts(fromAcc);
        await fetchLatestTransactions();
        setIsLoaded(true);
        return postResponse;


    };


    const editTransaction = async (oldData, newData) => {
        console.log("Here ")
        if (oldData.type === TRANSFER_TYPE) {
            await editTransferTransaction(oldData, newData);
            return;
        }

        let sign = 1;
        if (oldData.type === INCOME_TYPE) {
            sign = -1;
        }

        if (oldData.account === newData.account) {
            const deltaAmount = oldData.total - newData.total;
            const acc = accounts.filter(acc => acc.name === oldData.account)[0];
            acc.balance += deltaAmount * sign;
            await patchAccounts(acc);

        } else {

            const oldAcc = accounts.filter(acc => acc.name === oldData.account)[0];
            const newAcc = accounts.filter(acc => acc.name === newData.account)[0];

            if (newData.total === oldData.total) {
                oldAcc.balance += newData.total * sign;
                newAcc.balance -= newData.total * sign;
            } else {

                oldAcc.balance += oldData.total * sign;
                newAcc.balance -= newData.total * sign;
            }


            await patchAccounts(oldAcc);
            await patchAccounts(newAcc);
        }

        await patchTransaction(newData);
        await fetchLatestTransactions();
        await fetchHistoryTransactions(oldData.year, oldData.month);
    };

    const editTransferTransaction = async (oldData, newData) => {

        const oldFromAcc = accounts.filter(acc => acc.name === oldData.account)[0];
        const oldToAcc = accounts.filter(acc => acc.name === oldData.toAccount)[0];

        const newFromAcc = accounts.filter(acc => acc.name === newData.account)[0];
        const newToAcc = accounts.filter(acc => acc.name === newData.toAccount)[0];

        /*  await removeTransaction(oldData);
          await addTransferTransaction(newData);



          await fetchLatestTransactions();
          await fetchHistoryTransactions(oldData.year, oldData.month);

          const accounts = await fetchData(ACCOUNTS);
          if (accounts)
              setAccounts(accounts);
  */
        //todo rafactor
        // can use such method?

        if (newData.total === oldData.total) {
            if (oldFromAcc === newFromAcc) {
                // case when only TO acc changed
                if (oldToAcc !== newToAcc) {
                    oldToAcc.balance -= oldData.total;
                    newToAcc.balance += newData.total;
                } else {

                }

            } else {
                //case when only FROM account changed
                if (oldToAcc === newToAcc) {
                    oldFromAcc.balance += oldData.total;
                    newFromAcc.balance -= newData.total;
                } else {
                    oldFromAcc.balance += oldData.total;
                    oldToAcc.balance -= oldData.total;

                    newFromAcc.balance -= newData.total;
                    newToAcc.balance += newData.total;
                }

            }
        } else {
            const deltaAmount = oldData.total - newData.total;

            if (oldFromAcc === newFromAcc) {
                oldFromAcc.balance += deltaAmount;

                if (oldToAcc === newToAcc) {
                    oldToAcc.balance -= deltaAmount;
                } else {
                    newToAcc.balance += newData.total;
                    oldToAcc.balance -= oldData.total;
                }

            } else {

                if (oldToAcc === newToAcc) {
                    newFromAcc.balance -= newData.total;
                    oldFromAcc.balance += oldData.total;

                    oldToAcc.balance -= deltaAmount;
                } else {

                    oldFromAcc.balance += oldData.total;
                    oldToAcc.balance -= oldData.total;

                    newFromAcc.balance -= newData.total;
                    newToAcc.balance += newData.total;
                }

            }


        }

        await patchAccounts(oldFromAcc);
        await patchAccounts(newFromAcc);
        await patchAccounts(oldToAcc);
        await patchAccounts(newToAcc);

        await patchTransaction(oldData);
        await patchTransaction(newData);

        await fetchLatestTransactions();
        await fetchHistoryTransactions(oldData.year, oldData.month);
    };

    const removeTransaction = async (transaction) => {
        setIsLoaded(false);

        await deleteTransaction(transaction.id);

        const acc = accounts.filter(acc => acc.name === transaction.account)[0];

        if (transaction.type === SPEND_TYPE)
            acc.balance += transaction.total;
        if (transaction.type === INCOME_TYPE)
            acc.balance -= transaction.total;

        if (transaction.type === TRANSFER_TYPE) {
            acc.balance += transaction.total;
            const toAcc = accounts.filter(acc => acc.name === transaction.toAccount)[0];
            toAcc.balance -= transaction.total;
            await patchAccounts(toAcc);
        }


        await patchAccounts(acc);

        await fetchInitData();

        //TODO: not very accurate
        await fetchHistoryTransactions(transaction.year, transaction.month);
        setIsLoaded(true);

    };

    const editName = (nameId, newName, oldName) => {

    };


    return (
        <ApiContext.Provider value={{
            editTransaction: editTransaction,
            removeTransaction: removeTransaction,
            addTransaction: addTransaction,
            addIncomeTransaction: addIncomeTransaction,
            addTransferTransaction: addTransferTransaction,
            editName: editName
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
                fetchHistoryTransactions: fetchHistoryTransactions,
                getNameFromNameId: getNameFromNameId

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