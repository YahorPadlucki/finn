import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import EditFieldNamePopup from "./EditFieldNamePopup";
import DeletePopup from "./DeletePopup";
import ApiContext from "../context/ApiContext";


const Settings = () => {
    const {
        isLoaded,
        accounts,
        categories,
        editName,
        getNameFromNameId
    } = useContext(AppContext);
    const {removeAccount} = useContext(ApiContext);
    const [isEditPopupActive, setEditPopupActive] = useState(false);
    const [isDeletePopupActive, setDeletePopupActive] = useState(false);

    const [fieldToEdit, setFieldToEdit] = useState('');
    const [fieldToEditTypeName, setFieldToEditTypeName] = useState('');


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

            return <DeletePopup
                itemName={fieldToEditTypeName}
                OnDelete={() => {
                    // removeTransaction(transactionToEdit);
                    hideDeletePopup();
                }}
                OnCancel={hideDeletePopup}/>;

        }
    }


    function renderElements(elemets, typeName, deleteFunction) {
        return elemets.map(el => {
            return (
                <div className="item">
                    <div>{getNameFromNameId(el.nameId)}
                        <div className="mini ui button right floated" onClick={() => {
                            setFieldToEdit(el);
                            setEditPopupActive(true)
                        }}>/
                        </div>
                        {/*<div className="mini ui button red right floated" onClick={() => {*/}
                            {/*setFieldToEdit(el);*/}
                            {/*setDeletePopupActive(true)*/}
                            {/*setFieldToEditTypeName(typeName)*/}
                            {/*deleteFunction(el.id);*/}
                        {/*}}>X*/}
                        {/*</div>*/}
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
                {renderElements(accounts, "account",removeAccount)}
            </div>
            <h3>Categories</h3>
            <div className="ui middle aligned divided list">
                {renderElements(categories, "category")}
            </div>

            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default Settings;