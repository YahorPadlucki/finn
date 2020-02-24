import React, {useContext} from 'react';
import './History.css'
import TransactionsContext from "../context/TransactionsContext";

const History = (props) => {

    const transactions = useContext(TransactionsContext);

    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>;

        return transactions.map(() => {
            return (
                <div className="item ">
                    {/*<div className="right floated content">*/}
                    {/*<div className="ui button">/</div>*/}
                    {/*<div className="ui button red">X</div>*/}
                    {/*</div>*/}
                    <div className="content">
                        <label> Left </label>
                        <div>Floated</div>
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
                    <div className="transaction-item ">
                        {renderTransactions()}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default History;