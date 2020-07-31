import React, {useContext, useState} from 'react';
import AppContext from "../context/AppContext";
import EditFieldNamePopup from "./EditFieldNamePopup";
import DeletePopup from "./DeletePopup";
import ApiContext from "../context/ApiContext";


const Settings = () => {
    const EDIT = "edit";
    const ADD_ACCOUNT = "addAccount";
    const ADD_CATEGORY = "addCategory";

    const {
        isLoaded,
        accounts,
        categories,
        editName,
        getNameFromNameId,
        addAccount
    } = useContext(AppContext);
    const {removeAccount} = useContext(ApiContext);
    const [isEditPopupActive, setEditPopupActive] = useState(false);
    const [isDeletePopupActive, setDeletePopupActive] = useState(false);

    const [popupType, setPopupType] = useState(EDIT);

    const [fieldToEdit, setFieldToEdit] = useState('');
    const [namePopupTitle, setNamePopupTitle] = useState('');
    const [fieldToEditTypeName, setFieldToEditTypeName] = useState('');


    const hideEditPopup = () => setEditPopupActive(false);
    const hideDeletePopup = () => setDeletePopupActive(false);


    const dimmerStyle = `ui ${isLoaded ? '' : "active"} inverted dimmer`;


    function renderEditPopup() {
        if (isEditPopupActive) {
            return <EditFieldNamePopup
                isLoaded={isLoaded}
                title={namePopupTitle}
                fieldToEdit={fieldToEdit}
                // transactionToEdit={transactionToEdit}
                onSaveClickedCallBack={(data) => {

                    switch (popupType) {
                        case EDIT:
                            editName(data);
                            break;
                        case ADD_ACCOUNT:
                            addAccount(data.name);
                            break;
                        case ADD_CATEGORY:
                            break;
                    }

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
                            setNamePopupTitle("Edit name");
                            setEditPopupActive(true);
                            setPopupType(EDIT);
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

            <h3>Accounts
                <div className="mini ui button blue right floated" onClick={() => {
                    setNamePopupTitle("Add new Account");
                    setFieldToEdit('');
                    setEditPopupActive(true);
                    setPopupType(ADD_ACCOUNT);
                }}>+</div>
            </h3>
            <div className="ui middle aligned divided list">
                {renderElements(accounts, "account", removeAccount)}
            </div>


            <h3>Categories
                <div className="mini ui button blue right floated">+</div>

            </h3>
            <div className="ui middle aligned divided list">
                {renderElements(categories, "category")}
            </div>


            {renderEditPopup()}
            {renderDeletePopup()}
        </div>
    )
};

export default Settings;