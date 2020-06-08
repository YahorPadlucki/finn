import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {INCOME_TYPE, SPEND_TYPE, TRANSFER_TYPE} from "../api/types";

const InputDataForm = (props) => {

    const {accounts, categories, incomeCategories} = useContext(AppContext);

    const [isInputValid, setIsInputValid] = useState(true);
    const [date, setDate] = useState(props.date);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTransactionFormId, setSelectedTransactionFormId] = useState(1);

    const [selectedAccountFromName, setSelectedAccountFromName] = useState(props.selectedAccountFromName);
    const [selectedAccountToName, setSelectedAccountToName] = useState(props.selectedAccountToName);

    const [selectedCategoryName, setSelectedCategoryName] = useState(props.selectedCategoryName);
    const [selectedIncomeCategoryName, setSelectedIncomeCategoryName] = useState(props.selectedCategoryName);

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
    }, [selectedAccountFromName, selectedAccountToName]);

    useEffect(() => {
        if (accounts[0]) {
            if (!props.selectedAccountToName)
                setSelectedAccountToName(accounts[0].name);

            if (!props.selectedAccountFromName)
                setSelectedAccountFromName(accounts[0].name);
        }
    }, [accounts]);


    const onCategoryChangedInternal = (categoryName) => {
        setSelectedCategoryName(categoryName);
    };

    const onIncomeCategoryChangedInternal = (categoryName) => {
        setSelectedIncomeCategoryName(categoryName);
    };

    const onAccountFromChangedInternal = (accountName) => {
        setSelectedAccountFromName(accountName);

        if (props.onAccountChanged)
            props.onAccountChanged(accountName);
    };

    const onAccountToChanged = (accountName) => {
        setSelectedAccountToName(accountName);

    };

    const renderCategory = () => renderOptionsList(categories.map(category => category.name), (categoryName) => onCategoryChangedInternal(categoryName), selectedCategoryName);
    const renderIncomeCategory = () => renderOptionsList(incomeCategories.map(category => category.name), (categoryName) => onIncomeCategoryChangedInternal(categoryName), selectedIncomeCategoryName);

    const renderFromAccount = () => renderOptionsList(accounts.map(account => account.name), (accountName) => onAccountFromChangedInternal(accountName), selectedAccountFromName);
    const renderToAccount = () => renderOptionsList(accounts.map(account => account.name), (accountName) => onAccountToChanged(accountName), selectedAccountToName);


    const renderOptionsList = function (optionsArray, setStateFunction, selectedElement) {
        return (
            <select className="ui search dropdown" value={selectedElement}
                    onChange={e => setStateFunction(e.target.value)}>
                {optionsArray.map((option, i) => <option key={i} value={option}>{option}</option>)}
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

    const isInputFieldDisabled = () => selectedTransactionFormId === 1 && selectedAccountToName === selectedAccountFromName;

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
                "account": selectedAccountFromName ? selectedAccountFromName : props.selectedAccountFromName,
                "toAccount": selectedAccountToName,
                "category": getSelectedCategoryName(),
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

    const getSelectedCategoryName = () => {
        switch (selectedTransactionFormId) {
            case 0:
                return selectedCategoryName ? selectedCategoryName : props.selectedCategoryName;
            case 2:
                return selectedIncomeCategoryName ? selectedIncomeCategoryName : props.selectedIncomeCategoryName;
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


    const renderForm = (isIncome = false) => {
        return (
            <form className={formStateClassName} onSubmit={e => e.preventDefault()}>
                <div className="field">
                    <label>Account</label>
                    <div className="fields">
                        <div className="nine wide field">{renderFromAccount()}</div>
                        <div className="seven wide field">{renderAmountInputField()}</div>
                    </div>
                </div>
                <div className="field">
                    <label>Category</label>
                    <div className="fields">
                        <div className="nine wide field">{isIncome ? renderIncomeCategory() : renderCategory()}</div>
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


    const renderTransferForm = () => {
        return (
            <form className={formStateClassName} onSubmit={e => e.preventDefault()}>
                <div className="field">
                    <label>From Account</label>
                    <div className="fields">
                        <div className="nine wide field">{renderFromAccount()}</div>
                        <div className="seven wide field">{renderAmountInputField()}</div>
                    </div>
                </div>
                <div className="field">
                    <label>To Account</label>
                    <div className="fields">
                        <div className="nine wide field">{renderToAccount()}</div>
                    </div>
                </div>
                <div className="fields">
                    <div className="nine wide field">{renderNoteField()}</div>
                    <div className="seven wide field">{renderCalendar()}</div>
                </div>
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

    const renderFields = () => {

        switch (selectedTransactionFormId) {
            case 0:
                return renderForm();
            case 1:
                return renderTransferForm();
            case 2:
                return renderForm(true);
        }
    };


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
            {renderFields()}
        </div>
    );
};

export default InputDataForm;