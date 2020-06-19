import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";


const Settings = () => {
    const {
        isLoaded,
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
        return (
            <div className="row" >

                <div className="seven wide column" style={{textAlign: 'left'}}>
                    <label>xxx</label>
                </div>

                <div className="four wide column " style={{textAlign: 'right'}}>

                    <div className="mini ui button" onClick={() => {
                        // setTransactionToEdit(transaction);
                        setEditPopupActive(true)
                    }}>/
                    </div>
                    <div className="mini ui button red" onClick={() => {
                        // setTransactionToEdit(transaction);
                        setDeletePopupActive(true)
                    }}>X
                    </div>
                </div>
            </div>);



    }

    return (
        <div className="ui segment"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className={dimmerStyle}>
                <div className="ui text loader"/>
            </div>
            <h4 style={{textAlign: 'center'}}>Settings</h4>
            {renderAccounts()}
            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default Settings;