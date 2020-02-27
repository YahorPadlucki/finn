import React, {useContext} from 'react';
import './History.css'
import TransactionsContext from "../context/TransactionsContext";

const History = (props) => {

    const transactions = useContext(TransactionsContext);

    const formatDate = (dateStr)=>{
        const dateArray = dateStr.split('-');
        const day = dateArray[dateArray.length-1];
        const month = dateArray[dateArray.length-2];

        return `${day}.${month}`;
    };

    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>;

        return transactions.map((transaction) => {
            return (
                <div className=" divided row">
                    <strong className="one aligned wide column"
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
                        <strong style={{padding: '20px'}}>{transaction.total}</strong>
                        <div className="ui button">/</div>
                        <div className="ui button red">X</div>
                    </div>
                </div>

            );
        })

    };


    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <h4 style={{textAlign: 'center'}}>History</h4>
            <div id="container" className="ui middle aligned padded grid">
                {/*<div className="twelve wide column">*/}
                {renderTransactions()}
                {/*</div>*/}
            </div>
        </div>
    )
};

export default History;