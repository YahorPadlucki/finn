import React, {useState, useEffect} from 'react';
import {ACCOUNTS} from "./utils/types";
import fetchData from "./api/serverApi";

const BalanceHeader = (props) => {

    const [accounts, setAccounts] = useState([{name: "", balance: 0}]);
    // const [selectedAccountName, setSelectedAccountName] = useState('');

    useEffect(() => {
        fetchBalanceData();

    }, []);

    async function fetchBalanceData() {
        const accounts = await  fetchData(ACCOUNTS);
        setAccounts(accounts);
    }

    return (
        <div className="ui center aligned container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div>Total Balance:</div>
            <div>{
                 //TODO: data fetched after selected account
                console.log("selected account" + props.selectedAccountName)
                // accounts.find(el => el.name === props.selectedAccountName).balance
            }
            </div>
        </div>

    );
};

BalanceHeader.defaultProps = {
    selectedAccountName: ''
};

export default BalanceHeader;