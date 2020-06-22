import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";


const Settings = () => {
    const {
        isLoaded,
        accounts
    } = useContext(AppContext);
    const [isEditPopupActive, setEditPopupActive] = useState(false);
    const [isDeletePopupActive, setDeletePopupActive] = useState(false);


    const hideEditPopup = () => setEditPopupActive(false);
    const hideDeletePopup = () => setDeletePopupActive(false);

    const dimmerStyle = `ui ${isLoaded ? '' : "active"} inverted dimmer`;


    function renderEditPopup() {
        if (isEditPopupActive) {

            return "";// edit popup
        }
    }


    function renderDeletePopup() {
        if (isDeletePopupActive) {

            return ""; // delete popip
        }
    }


    function renderAccounts() {
        return accounts.map(acc => {
            return (
                <div className="item">
                    <div>{acc.name}
                        <div className="mini ui button right floated" onClick={() => {
                            // setTransactionToEdit(transaction);
                            setEditPopupActive(true)
                        }}>/
                        </div>
                        <div className="mini ui button red right floated" onClick={() => {
                            // setTransactionToEdit(transaction);
                            setDeletePopupActive(true)
                        }}>X
                        </div>
                    </div>
                </div>
            );
        });


    }

    return (
        <div className="ui segment"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className={dimmerStyle}>
                <div className="ui text loader"/>
            </div>
            <h4 style={{textAlign: 'center'}}>Settings</h4>
            <h3>Accounts</h3>
            <div className="ui middle aligned divided list">
                {renderAccounts()}
            </div>
            <h3>Categories</h3>
            {renderAccounts()}

            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default Settings;