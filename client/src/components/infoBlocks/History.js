import React, {useContext, useState} from 'react';
import TransactionsContext from "../context/TransactionsContext";
import EditTransactionPopup from "./EditTransactionPopup";

const History = (props) => {

    const transactions = useContext(TransactionsContext);
    const [isEditPopupActive, setEditPopupActive] = useState(false);
    const [transactionToEdit,setTransactionToEdit] = useState({});

    const formatDate = (dateStr) => {
        const dateArray = dateStr.split('-');
        const day = dateArray[dateArray.length - 1];
        const month = dateArray[dateArray.length - 2];

        return `${day}.${month}`;
    };


    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>;

        return transactions.map((transaction) => {
            return (
                <div className="row">
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
                        }}>/</div>
                        <div className="mini ui button red">X</div>
                    </div>
                </div>

            );
        })

    };

    function renderEditPopup() {
        if (isEditPopupActive){

            console.log(transactionToEdit)

            return <EditTransactionPopup OnCancel={() => setEditPopupActive(false)}/>;
        }
    }

    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <h4 style={{textAlign: 'center'}}>History</h4>
            <div className="ui centered padded grid">
                {renderTransactions()}
            </div>
            {renderEditPopup()}
        </div>

    )
};

export default History;