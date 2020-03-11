import React from 'react';
import Modal from "../popup/Modal";
import InputDataForm from "./InputDataForm";

const EditTransactionPopup = (props) => {


    const renderContent = () => {
        return (
            <InputDataForm isLoaded={props.isLoaded}
                           date={props.transactionToEdit.date}
                           selectedAccountName={props.transactionToEdit.selectedAccountName}
                           selectedCategoryName={props.transactionToEdit.selectedCategoryName}
                           onSaveClickedCallBack={props.onSaveClickedCallBack}

            />)

    };

    const renderActions = () => {
        return (

            <div style={{textAlign: 'right'}}>
                <button className='ui button blue'>Save</button>
                <button className='ui button' onClick={props.OnCancel}>Cancel</button>
            </div>


        );

    };

    const onCancel = () => {
        props.OnCancel();
    };

    return (
        <Modal
            title="Edit transaction"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={onCancel}
        />
    );

};

export default EditTransactionPopup;
