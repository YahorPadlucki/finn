import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import EditFieldNamePopup from "./EditFieldNamePopup";


const Settings = () => {
    const {
        isLoaded,
        accounts,
        categories,
        editName,
        getNameFromNameId
    } = useContext(AppContext);
    const [isEditPopupActive, setEditPopupActive] = useState(false);
    const [isDeletePopupActive, setDeletePopupActive] = useState(false);

    const [fieldToEdit, setFieldToEdit] = useState('');


    const hideEditPopup = () => setEditPopupActive(false);
    const hideDeletePopup = () => setDeletePopupActive(false);

    const dimmerStyle = `ui ${isLoaded ? '' : "active"} inverted dimmer`;


    function renderEditPopup() {
        if (isEditPopupActive) {
            return <EditFieldNamePopup
                isLoaded={isLoaded}
                fieldToEdit={fieldToEdit}
                // transactionToEdit={transactionToEdit}
                onSaveClickedCallBack={(data) => {
                    editName(data);
                    hideEditPopup();
                }}
                OnCancel={hideEditPopup}/>;
        }
    }


    function renderDeletePopup() {
        if (isDeletePopupActive) {

            return ""; // delete popip
        }
    }


    function renderElements(elemets) {
        return elemets.map(el => {
            return (
                <div className="item">
                    <div>{getNameFromNameId(el.nameId)}
                        <div className="mini ui button right floated" onClick={() => {
                            setFieldToEdit(el);
                            setEditPopupActive(true)
                        }}>/
                        </div>
                        <div className="mini ui button red right floated" onClick={() => {
                            setFieldToEdit(el);
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
                {renderElements(accounts)}
            </div>
            <h3>Categories</h3>
            <div className="ui middle aligned divided list">
                {renderElements(categories)}
            </div>

            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default Settings;