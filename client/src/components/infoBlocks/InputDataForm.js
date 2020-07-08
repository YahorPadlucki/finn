import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {INCOME_TYPE, SPEND_TYPE, TRANSFER_TYPE} from "../api/types";

const InputDataForm = (props) => {

    const {
        accounts, categories, incomeCategories,
        getNameFromNameId
    } = useContext(AppContext);

    const [isInputValid, setIsInputValid] = useState(true);
    const [date, setDate] = useState(props.date);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTransactionFormId, setSelectedTransactionFormId] = useState(0);


    //TODO: Change to ids
    const [selectedAccountFromNameId, setSelectedAccountFromNameId] = useState(props.selectedAccountFromNameId);
    const [selectedAccountToNameId, setSelectedAccountToNameId] = useState(props.selectedAccountToNameId);

    const [selectedCategoryNameId, setSelectedCategoryNameId] = useState(props.selectedCategoryNameId);
    const [selectedIncomeCategoryNameId, setSelectedIncomeCategoryNameId] = useState(props.selectedIncomeCategoryNameId);

    let amountInput;


    useEffect(() => {
        // component did mount
        if (props.amount) {
            setAmount(props.amount);

        } else {
            //TODO:
            // amountInput.focus();
        }


        if (props.description) {
            setDescription(props.description);
        }

        if (props.transactionType) {
            if (props.transactionType === SPEND_TYPE) {
                setSelectedTransactionFormId(0)
            }
            if (props.transactionType === INCOME_TYPE) {
                setSelectedTransactionFormId(2)
            }
        }

        if (!date) {
            setDate(new Date());
        }

    }, []);


    useEffect(() => {
        renderAmountInputField();
    }, [selectedAccountFromNameId, selectedAccountToNameId]);

    useEffect(() => {
        if (accounts[0]) {
            if (!props.selectedAccountToNameId)
                setSelectedAccountToNameId(accounts[0].nameId);

            if (!props.selectedAccountFromNameId)
                setSelectedAccountFromNameId(accounts[0].nameId);
        }
    }, [accounts]);


    const onCategoryChangedInternal = (categoryNameId) => {
        setSelectedCategoryNameId(categoryNameId);
    };

    const onIncomeCategoryChangedInternal = (categoryNameID) => {
        setSelectedIncomeCategoryNameId(categoryNameID);
    };

    const onAccountFromChangedInternal = (accountNameId) => {
        setSelectedAccountFromNameId(accountNameId);

        if (props.onAccountChanged)
            props.onAccountChanged(accountNameId);
    };

    const onAccountToChanged = (accountNameId) => {
        setSelectedAccountToNameId(accountNameId);

    };

    const renderCategory = () => renderOptionsList(categories.map(category => category.nameId), (categoryNameId) => onCategoryChangedInternal(categoryNameId), selectedCategoryNameId);
    const renderIncomeCategory = () => renderOptionsList(incomeCategories.map(category => category.nameId), (categoryNameId) => onIncomeCategoryChangedInternal(categoryNameId), selectedIncomeCategoryNameId);

    const renderFromAccount = () => renderOptionsList(accounts.map(account => account.nameId), (accountNameId) => onAccountFromChangedInternal(accountNameId), selectedAccountFromNameId);
    const renderToAccount = () => renderOptionsList(accounts.map(account => account.nameId), (accountNameId) => onAccountToChanged(accountNameId), selectedAccountToNameId);


    const renderOptionsList = function (optionsArray, setStateFunction, selectedElement) {
        return (
            <select className="ui search dropdown" value={selectedElement}
                    onChange={e => setStateFunction(parseInt(e.target.value))}>
                {
                    optionsArray.map((option, i) => {
                        return <option key={i} value={option}>{getNameFromNameId(option)}</option>
                    })
                }
            </select>
        );
    };

    const renderCalendar = function () {
        return (
            <DatePicker selected={date}
                        onChange={(date) => setDate(date)}/>
        );
    };

    const clearFields = () => {
        setAmount('');
        setDescription('');
    };

    const isInputFieldDisabled = () => selectedTransactionFormId === 1 && selectedAccountToNameId === selectedAccountFromNameId;

    const getInputFieldClassName = () => {
        return `field ${isInputValid ? '' : 'error'} ${isInputFieldDisabled() ? `disabled` : ``}`;

    };

    const renderAmountInputField = function () {
        if (!isErrorInInputField()) {
            if (!isInputValid)
                setIsInputValid(true);
        }
        return (
            <div className={getInputFieldClassName()}>
                <input type="text"
                       style={{}}
                       ref={(input) => {
                           amountInput = input;
                       }}
                       value={amount}
                       onChange={e => setAmount(e.target.value)}
                       onKeyPress={onKeyPress}
                       placeholder="Amount"/>
            </div>
        );
    };

    const renderNoteField = function () {
        return (
            <div className="field">
                <input type="text"
                       value={description}
                       onChange={e => setDescription(e.target.value)}
                       onKeyPress={onKeyPress}
                       placeholder="Note"/>
            </div>
        );
    };

    const isErrorInInputField = () => {
        return amount.length === 0 || isNaN(amount) || amount <= 0 || isInputFieldDisabled();
    };

    const onSaveClicked = async () => {
        if (isErrorInInputField() || isInputFieldDisabled()) {
            setIsInputValid(false);
        } else {
            if (!isInputValid)
                setIsInputValid(true);

            const transactionType = getTransactionType();

            const transactionData = {
                "total": Number(amount),
                "accountNameId": selectedAccountFromNameId ? selectedAccountFromNameId : props.selectedAccountFromNameId,
                "toAccountNameId": selectedAccountToNameId,
                "categoryNameId": getSelectedCategoryNameId(),
                "date": date,
                "year": date.getFullYear(),
                "month": date.getMonth(),
                "day": date.getDate(),
                "description": description,
                "type": transactionType
            };

            if (props.id) {
                transactionData.id = props.id;
            }

            props.onSaveClickedCallBack(transactionData, transactionType);

            clearFields();
            // const postResponse = await postTransaction();


        }
    };

    const getTransactionType = () => {
        switch (selectedTransactionFormId) {
            case 0:
                return SPEND_TYPE;
            case 1:
                return TRANSFER_TYPE;
            case 2:
                return INCOME_TYPE;
        }
    };

    const getSelectedCategoryNameId = () => {
        switch (selectedTransactionFormId) {
            case 0:
                return selectedCategoryNameId ? selectedCategoryNameId : props.selectedCategoryNameId;
            case 2:
                return selectedIncomeCategoryNameId ? selectedIncomeCategoryNameId : props.selectedIncomeCategoryNameId;
        }

    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSaveClicked();
        }

    };
    const renderCancelButton = () => {
        if (props.onCancel)
            return <button className='big ui button' onClick={() => props.onCancel()}>Cancel</button>;
    };
    const formStateClassName = `ui form ${!props.isLoaded ? 'loading' : ''}`;

    const getAccountTitle = () => {
        switch (selectedTransactionFormId) {
            case 0:
                return "Account";
            case  1:
                return "From Account";
            case 2:
                return "To Account";
        }
    };


    const getCategoryTitle = () => {
        switch (selectedTransactionFormId) {
            case 0:
                return "Category";
            case  1:
                return "To Account";
            case 2:
                return "From";
        }
    };

    const getRenderCategory = () => {
        switch (selectedTransactionFormId) {
            case 0:
                return renderCategory();
            case  1:
                return renderToAccount();
            case 2:
                return renderIncomeCategory();
        }
    };


    const renderForm = () => {
        return (
            <form className={formStateClassName} onSubmit={e => e.preventDefault()}>
                <div className="field">
                    <label>{getAccountTitle()}</label>
                    <div className="fields">
                        <div className="nine wide field">{renderFromAccount()}</div>
                        <div className="seven wide field">{renderAmountInputField()}</div>
                    </div>
                </div>
                <div className="field">
                    <label>{getCategoryTitle()}</label>
                    <div className="fields">
                        <div className="nine wide field">{getRenderCategory()}</div>
                        <div className="seven wide field">{renderCalendar()}</div>
                    </div>
                </div>
                {renderNoteField()}
                <div style={{textAlign: 'right'}}>
                    <button className="big ui primary button "
                            onClick={onSaveClicked}>
                        Save
                    </button>
                    {renderCancelButton()}
                </div>

            </form>
        );
    };


    const getMenuItemClass = (id) => `item ${id === selectedTransactionFormId ? 'active' : ''}`;
    const onMenuItemClicked = (id) => setSelectedTransactionFormId(id);

    let renderToggleBar = function () {
        if (!props.isEditPopup) {
            return (
                <div className="ui three item menu">
                    <a className={getMenuItemClass(0)} onClick={() => onMenuItemClicked(0)}>Expense</a>
                    <a className={getMenuItemClass(1)} onClick={() => onMenuItemClicked(1)}>Transfer</a>
                    <a className={getMenuItemClass(2)} onClick={() => onMenuItemClicked(2)}>Income</a>
                </div>
            )
        }


    };
    return (
        <div className="eight wide column">
            {renderToggleBar()}
            {renderForm()}
        </div>
    );
};

export default InputDataForm;