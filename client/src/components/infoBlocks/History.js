import React, {useContext, useEffect, useState} from 'react';
import EditTransactionPopup from "./EditTransactionPopup";
import ApiContext from "../context/ApiContext";
import DeleteTransactionPopup from "./DeleteTransactionPopup";
import AppContext from "../context/AppContext";

const History = (props) => {

    const {transactions, isLoaded, loadMoreTransactions, isAllTransactionsLoaded} = useContext(AppContext);
    const {editTransaction, removeTransaction} = useContext(ApiContext);
    const [isEditPopupActive, setEditPopupActive] = useState(false);
    const [isDeletePopupActive, setDeletePopupActive] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState({});

    const [itemsToShow, setItemsToShow] = useState(props.itemsToShow);

    const formatDate = (dateStr) => {
        const dateArray = dateStr.split('-');
        const day = dateArray[dateArray.length - 1];
        const month = dateArray[dateArray.length - 2];

        return `${day}.${month}`;
    };

    useEffect(() => {
        // component did mount
        setItemsToShow(props.itemsToShow)
        console.log("history did mount " + props.itemsToShow)
        // fetchInitData();

    }, []);


    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>;

        return transactions.slice(0, itemsToShow).map((transaction, index) => {
            return (
                <div className="row" key={index}>
                    <strong className="five  wide column"
                            style={{textAlign: 'left', verticalAlign: 'text-bottom'}}>
                        {formatDate(transaction.date)}
                    </strong>

                    <div className="seven wide column" style={{textAlign: 'left'}}>
                        <label>{transaction.account}</label>
                        <label> -> </label>
                        <label>{transaction.category}</label>
                        <div>{transaction.description}</div>
                    </div>

                    <div className="four wide column " style={{textAlign: 'right'}}>
                        <label style={{padding: '20px'}}>{transaction.total}</label>
                        <div className="mini ui button" onClick={() => {
                            setTransactionToEdit(transaction);
                            setEditPopupActive(true)
                        }}>/
                        </div>
                        <div className="mini ui button red" onClick={() => {
                            setTransactionToEdit(transaction);
                            setDeletePopupActive(true)
                        }}>X
                        </div>
                    </div>
                </div>

            );
        })

    };

    function renderEditPopup() {
        if (isEditPopupActive) {

            return <EditTransactionPopup
                isLoaded={true}
                transactionToEdit={transactionToEdit}
                onSaveClickedCallBack={(transactionData) => {
                    editTransaction(transactionToEdit, transactionData);
                    hideEditPopup();
                }}
                OnCancel={hideEditPopup}/>;
        }
    }


    function renderDeletePopup() {
        if (isDeletePopupActive) {

            return <DeleteTransactionPopup
                OnDelete={() => {
                    removeTransaction(transactionToEdit);
                    hideDeletePopup();
                }}
                OnCancel={hideDeletePopup}/>;
        }
    }


    function renderShowMoreButton() {
        if (isAllTransactionsLoaded)
            return;

        return (
            <button
                className="ui button"
                onClick={showMoreClicked}>
                Show more
            </button>
        );
    }

    const showMoreClicked = () => {

        let newItemsToShowAmount = itemsToShow + 5;

        // if(!isAllTransactionsLoaded)
            setItemsToShow(newItemsToShowAmount);
        // if (itemsToShow < transactions.length) {

        // }

        console.log("itemsToShow "+itemsToShow)

        if (newItemsToShowAmount > transactions.length) {
            loadMoreTransactions();
        }

    };


    const hideEditPopup = () => setEditPopupActive(false);
    const hideDeletePopup = () => setDeletePopupActive(false);

    const dimmerStyle = `ui ${isLoaded ? '' : "active"} inverted dimmer`;
    return (

        <div className="ui segment"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className={dimmerStyle}>
                <div className="ui text loader"/>
            </div>
            <h4 style={{textAlign: 'center'}}>History</h4>
            <div className="ui centered padded grid">
                {renderTransactions()}
                {renderShowMoreButton()}
            </div>

            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default History;