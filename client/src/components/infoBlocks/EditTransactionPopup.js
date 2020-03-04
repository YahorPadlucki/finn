import React from 'react';
import Modal from "../popup/Modal";

const EditTransactionPopup = (props) => {

    const renderContent = () => {
        return (
            <div className="eight wide column">
                <form className="ui form" onSubmit={e => e.preventDefault()}>
                    <div className="field">
                        <label>Account</label>
                        <div className="fields">
                            <div className="nine wide field"></div>
                            <div className="seven wide field"></div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Category</label>
                        <div className="fields">
                            <div className="nine wide field"></div>
                            <div className="seven wide field"></div>
                        </div>
                    </div>
                </form>
            </div>);
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
