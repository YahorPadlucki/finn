import React from 'react';

const BalanceHeader = (props) => {
    return (
        <div className="ui center aligned container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div>{props.accountName} Balance:</div>
            <div>{props.balance}</div>
        </div>
    );
};

BalanceHeader.defaultProps = {
    accountName: '',
    balance: 0
};

export default BalanceHeader;