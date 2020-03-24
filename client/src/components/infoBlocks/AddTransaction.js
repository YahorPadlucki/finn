import React, {useContext, useState} from 'react';
import History from "./History";
import InputDataForm from "./InputDataForm";
import AppContext from "../context/AppContext";
import ApiContext from "../context/ApiContext";

const AddTransaction = (props) => {

    const {accounts} = useContext(AppContext);
    const {addTransaction} = useContext(ApiContext);

    const [isTransactionInProcess, setIsTransactionInProcess] = useState(false);
    const [transactionStatusMessage, setTransactionStatusMessage] = useState('');

    const onSaveClicked = async (transactionData) => {
        setIsTransactionInProcess(true);

        const postResponse = await addTransaction(transactionData);

        if (postResponse)
            setTransactionStatusMessage("Transaction Saved");
        else
            setTransactionStatusMessage("Failed to Save");

        setIsTransactionInProcess(false);
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
                               selectedCategoryName={props.selectedCategoryName}
                               selectedAccountName={props.selectedAccountName}
                               onAccountChanged={props.onAccountChanged}
                               onSaveClickedCallBack={onSaveClicked}

                />
            </div>
            <div style={{textAlign: 'center'}}>{transactionStatusMessage}</div>
            <History/>
        </div>

    )

};

export default AddTransaction;