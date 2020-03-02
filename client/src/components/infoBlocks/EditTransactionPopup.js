import React from 'react';
import Modal from "../popup/Modal";

const EditTransactionPopup = (props) => {

    const renderContent = () => {
        return `....`;
    };

    const renderActions = () => {
        return (
            <React.Fragment>
                <button className='ui button blue'>Save</button>
                <button className='ui button'>Cancel</button>
            </React.Fragment>
        );

    };

    const onCancel = (props) => {
        console.log("!@31")
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
