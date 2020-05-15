import React from 'react';
import Modal from "../popup/Modal";
import InputDataForm from "./InputDataForm";

const EditTransactionPopup = (props) => {


    const renderContent = () => {
        return (
            <InputDataForm isLoaded={props.isLoaded}
                           isEditPopup={true}
                           date={new Date(props.transactionToEdit.date)}
                           description={props.transactionToEdit.description}
                           amount={props.transactionToEdit.total}
                           id={props.transactionToEdit.id}
                           selectedAccountName={props.transactionToEdit.account}
                           selectedCategoryName={props.transactionToEdit.category}
                           transactionType={props.transactionToEdit.type}
                           onSaveClickedCallBack={props.onSaveClickedCallBack}
                           onCancel={props.OnCancel}

            />)

    };

    return (
        <Modal
            title="Edit transaction"
            content={renderContent()}
            onDismiss={() => props.OnCancel()}
        />
    );

};

export default EditTransactionPopup;
