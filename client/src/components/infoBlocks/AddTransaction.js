import React, {useContext, useState} from 'react';
import {postTransaction} from '../api/serverApi'
import History from "./History";
import InputDataForm from "./InputDataForm";
import AccountsContext from "../context/AccountsContext";

const AddTransaction = (props) => {

    const accounts = useContext(AccountsContext);

    const [isTransactionInProcess, setIsTransactionInProcess] = useState(false);
    const [transactionStatusMessage, setTransactionStatusMessage] = useState('');

    const onSaveClicked = async (transactionData) => {
        setIsTransactionInProcess(true);

        const postResponse = await postTransaction(transactionData);

        if (postResponse)
            onSaveSuccess();
        else
            onFail();

        setIsTransactionInProcess(false);
    };


    const onSaveSuccess = () => {
        setTransactionStatusMessage("Transaction Saved");
        props.onSuccessCallBack();
    };

    const onFail = () => {
        setTransactionStatusMessage("Failed to Save");

    };

    const renderAccounts = () => accounts.map((acc, i) => <p key={i}>{acc.name}: {acc.balance}</p>);

    const renderBalanceBlock = function () {
        return (
            <div className="ui segment">
                <h3 className="header">Balance</h3>
                {renderAccounts()}
            </div>
        );
    };
    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>

            <div className="ui centered grid" style={{padding: '10px'}}>
                <div className="four wide column">
                    {renderBalanceBlock()}
                </div>
                <InputDataForm isLoaded={props.isLoaded && !isTransactionInProcess}
                               onCategoryChanged={props.onCategoryChanged}
                               onAccountChanged={props.onAccountChanged}
                               selectedCategoryName={props.selectedCategoryName}
                               selectedAccountName={props.selectedAccountName}
                               onSaveClickedCallBack={onSaveClicked}

                />
            </div>
            <div style={{textAlign: 'center'}}>{transactionStatusMessage}</div>
            <History/>
        </div>

    )

};

export default AddTransaction;