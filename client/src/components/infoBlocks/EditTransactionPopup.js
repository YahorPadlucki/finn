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
                           selectedAccountFromNameId={props.transactionToEdit.accountNameId}
                           selectedAccountToNameId={props.transactionToEdit.toAccountNameId}
                           selectedCategoryNameId={props.transactionToEdit.categoryNameId}
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
