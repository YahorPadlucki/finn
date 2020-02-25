import React, {useContext} from 'react';
// import './History.css'
import TransactionsContext from "../context/TransactionsContext";

const History = (props) => {

    const transactions = useContext(TransactionsContext);

    const renderTransactions = () => {
        if (!transactions) return <div>Loading</div>;

        return transactions.map(() => {
            return (
                <div className="row">
                    <div className="two wide column" style={{textAlign:'left'}}>
                        22.10
                    </div>
                    <div className="five wide column" style={{textAlign:'left'}}>
                        <label>Cash -></label>
                        <label>Food</label>
                    </div>
                    <div className="five wide column" style={{textAlign:'right'}}>
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
            <div className="ui center aligned grid">
                {/*<div className="twelve wide column">*/}
                <div>History:</div>
                {renderTransactions()}
                {/*</div>*/}
            </div>
        </div>
    )
};

export default History;