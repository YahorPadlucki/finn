import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {INCOME_TYPE, SPEND_TYPE} from "../api/types";

const InputDataForm = (props) => {

    const {accounts, categories, incomeCategories} = useContext(AppContext);

    const [isInputValid, setIsInputValid] = useState(true);
    const [date, setDate] = useState(props.date);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTransactionFormId, setSelectedTransactionFormId] = useState(1);

    const [selectedAccountName, setSelectedAccountName] = useState(props.selectedAccountName);
    const [selectedCategoryName, setSelectedCategoryName] = useState(props.selectedCategoryName);
    const [selectedIncomeCategoryName, setSelectedIncomeCategoryName] = useState(props.selectedCategoryName);

    let amountInput;


    useEffect(() => {
        // component did mount
        console.log("=== selected account " + props.selectedAccountName)
        console.log("=== selected income " + props.selectedAccountName)
        console.log("=== selected income " + props.selectedAccountName)

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
            setCurrentDate();
        }

    }, []);


    const setCurrentDate = function () {
        const date = new Date();
        // const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
        //     '-' + date.getDate().toString().padStart(2, 0);

        setDate(date);
    };

    const onCategoryChangedInternal = (categoryName) => {
        setSelectedCategoryName(categoryName);
    };

    const onIncomeCategoryChangedInternal = (categoryName) => {
        setSelectedIncomeCategoryName(categoryName);
    };

    const onAccountChangedInternal = (accountName) => {
        setSelectedAccountName(accountName);
        console.log("== changed internal " + accountName)

        if (props.onAccountChanged)
            props.onAccountChanged(accountName);
    };

    const renderCategory = () => renderOptionsList(categories.map(category => category.name), (categoryName) => onCategoryChangedInternal(categoryName), selectedCategoryName);
    const renderIncomeCategory = () => renderOptionsList(incomeCategories.map(category => category.name), (categoryName) => onIncomeCategoryChangedInternal(categoryName), selectedIncomeCategoryName);

    const renderAccount = () => renderOptionsList(accounts.map(account => account.name), (accountName) => onAccountChangedInternal(accountName), selectedAccountName);


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


    const renderAmountInputField = function () {
        const className = `field ${isInputValid ? '' : 'error'}`;
        return (
            <div className={className}>
                <input type="text"
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

    const onSaveClicked = async () => {
        if (amount.length === 0 || isNaN(amount) || amount <= 0) {
            setIsInputValid(false);
        } else {
            if (!isInputValid)
                setIsInputValid(true);

            const transactionType = getTransactionType();

            const transactionData = {
                "total": Number(amount),
                "account": selectedAccountName ? selectedAccountName : props.selectedAccountName,
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
                        <div className="nine wide field">{renderAccount()}</div>
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
                        <div className="nine wide field">{renderAccount()}</div>
                        <div className="seven wide field">{renderAmountInputField()}</div>
                    </div>
                </div>
                <div className="field">
                    <label>To Account</label>
                    <div className="fields">
                        <div className="nine wide field">{renderAccount()}</div>
                        <div className="seven wide field">{renderAmountInputField()}</div>
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