import React, {useContext} from 'react';
import AppContext from "../context/AppContext";

const BalanceBlock = () => {
    const {
        accounts,
        getNameFromNameId
    } = useContext(AppContext);

    const renderAccounts = () => accounts.map((acc, i) => <p
        key={i}>{getNameFromNameId(acc.nameId)}: {acc.balance}</p>);

    return (
        <div className="ui segment">
            <h3 className="header">Balance</h3>
            {renderAccounts()}
        </div>
    );


};

export default BalanceBlock;