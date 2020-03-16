import React from 'react';
import Modal from "../popup/Modal";

const DeleteTransactionPopup = (props) => {


    const renderContent = () => {
        return

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
            // actions={renderActions()}
            onDismiss={onCancel}
        />
    );

};

export default DeleteTransactionPopup;
