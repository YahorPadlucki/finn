import React, {useContext, useState} from 'react';
import History from "./History";
import InputDataForm from "./InputDataForm";
import ApiContext from "../context/ApiContext";
import {INCOME_TYPE, SPEND_TYPE, TRANSFER_TYPE} from "../api/types";
import BalanceBlock from "./BalanceBlock";

const AddTransaction = (props) => {

    const {addTransaction, addTransferTransaction, addIncomeTransaction} = useContext(ApiContext);

    const [isTransactionInProcess, setIsTransactionInProcess] = useState(false);
    const [transactionStatusMessage, setTransactionStatusMessage] = useState('');

    const onSaveClicked = async (transactionData, transactionType) => {
        setIsTransactionInProcess(true);


        let postResponse;

        switch (transactionType) {
            case SPEND_TYPE:
                postResponse = await addTransaction(transactionData);
                break;
            case TRANSFER_TYPE:
                postResponse = await addTransferTransaction(transactionData);
                break;
            case INCOME_TYPE:
                postResponse = await addIncomeTransaction(transactionData);
                break;
        }


        if (postResponse)
            setTransactionStatusMessage("Transaction Saved");
        else
            setTransactionStatusMessage("Failed to Save");

        setIsTransactionInProcess(false);
    };


    return (

        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>

            <div className="ui centered grid" style={{padding: '10px'}}>
                <div className="four wide column">
                    <BalanceBlock/>
                </div>
                <InputDataForm isLoaded={props.isLoaded && !isTransactionInProcess}
                               selectedCategoryNameId={props.selectedCategoryNameId}
                               selectedAccountNameId={props.selectedAccountNameId}
                               selectedIncomeCategoryNameId={props.selectedIncomeCategoryNameId}
                               onAccountChanged={props.onAccountChanged}
                               onSaveClickedCallBack={onSaveClicked}

                />
            </div>
            <div style={{textAlign: 'center'}}>{transactionStatusMessage}</div>
            <History itemsToShow={5}/>
        </div>

    )

};

export default AddTransaction;