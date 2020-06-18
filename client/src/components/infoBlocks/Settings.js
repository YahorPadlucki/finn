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

    }

    return (
        <div className="ui segment"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className={dimmerStyle}>
                <div className="ui text loader"/>
            </div>
            <h4 style={{textAlign: 'center'}}>Settings</h4>
            <div className="ui centered padded grid">
                {renderAccounts()}
            </div>

            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default Settings;