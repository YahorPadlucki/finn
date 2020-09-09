import React from 'react';
import BalanceBlock from "./BalanceBlock";

const Balance = () => {

    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className="ui centered grid" style={{padding: '10px'}}>
                <div className="four wide column">
                    <BalanceBlock/>
                </div>
            </div>
        </div>
    )
};

export default Balance;