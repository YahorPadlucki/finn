import React, {useContext} from 'react';
import './History.css'
import TransactionsContext from "../context/TransactionsContext";

const History = (props) => {

    const transactions = useContext(TransactionsContext);

    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>;

        return transactions.map(() => {
            return (
                <div className=" divided row">
                    <strong className="one aligned wide column"
                            style={{textAlign: 'left', verticalAlign: 'text-bottom'}}>
                        22.10
                    </strong>

                    <div className="seven wide column" style={{textAlign: 'left'}}>
                        <label>Cash</label>
                        <label> -> </label>
                        <label>Food</label>
                        <div>ticktets to Dublin</div>
                    </div>

                    <div className="four wide column " style={{textAlign: 'right'}}>
                        <strong style={{padding: '20px'}}>150 UDS</strong>
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