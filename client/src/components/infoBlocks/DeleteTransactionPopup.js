import React from 'react';
import Modal from "../popup/Modal";

const DeleteTransactionPopup = (props) => {

    const renderContent = () => {
        return 'Are you sure you want to delete this transaction?'

    };

    const renderActions = () => {

        return (
            <div style={{textAlign: 'right'}}>
                <button className='ui button red ' onClick={
                    () => {
                        props.OnDelete();
                    }
                }>Delete
                </button>
                <button className='ui button' onClick={props.OnCancel}>Cancel</button>
            </div>


        );

    };

    const onCancel = () => {
        props.OnCancel();
    };

    return (
        <Modal
            title="Delete transaction"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={onCancel}
        />
    );

};

export default DeleteTransactionPopup;
