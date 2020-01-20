import React from 'react';
import Modal from "./popup/Modal";

const AddTransactionPopup = () => {

    const renderContent = () => {
        return `Add Transaction`;
    };

    const renderActions = () => {
        return (
            <React.Fragment>
                <button className='ui button negative'>Delete</button>
                <button className='ui button'>Cancel</button>
            </React.Fragment>
        );

    };

    const onCancel = () => {
    };

    return (
        <Modal
            title="Delete stream"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={onCancel}
        />
    );

};

export default AddTransactionPopup;
