import React, {useContext} from 'react';
import TransactionsContext from "../context/TransactionsContext";

const History = (props) => {

    const transactions = useContext(TransactionsContext);

    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>

        return transactions.map(() => {
            return (
                <div className="item">
                    <div className="right floated content">
                        <div className="ui button">Edit</div>
                    </div>
                    <div className="content">
                        Lena
                    </div>
                </div>
            );
        })

    };


    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className="ui centered grid" style={{padding: '10px'}}>
                <div className="twelve wide column">
                    <div>History:</div>
                    <div className="ui middle aligned divided list">
                        {renderTransactions()}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default History;