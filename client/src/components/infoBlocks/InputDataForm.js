import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDataForm = (props) => {

    const {accounts, categories} = useContext(AppContext);

    const [isInputValid, setIsInputValid] = useState(true);
    const [date, setDate] = useState(props.date);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedMenuId, setSelectedMenuId] = useState(0);

    const [selectedAccountName, setSelectedAccountName] = useState(props.selectedAccountName);
    const [selectedCategoryName, setSelectedCategoryName] = useState(props.selectedCategoryName);

    let amountInput;


    useEffect(() => {
        // component did mount
        console.log("=== selected account " + props.selectedAccountName)

        if (props.amount) {
            setAmount(props.amount);

        } else {
            //TODO:
            // amountInput.focus();
        }


        if (props.description) {
            setDescription(props.description);
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

    const onAccountChangedInternal = (accountName) => {
        setSelectedAccountName(accountName);

        if (props.onAccountChanged)
            props.onAccountChanged(accountName);
    };

    const renderCategory = () => renderOptionsList(categories.map(category => category.name), (categoryName) => onCategoryChangedInternal(categoryName), selectedCategoryName);

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


            const transactionData = {
                "total": Number(amount),
                "account": selectedAccountName ? selectedAccountName : props.selectedAccountName,
                "category": selectedCategoryName ? selectedCategoryName : props.selectedCategoryName,
                "date": date,
                "year": date.getFullYear(),
                "month": date.getMonth(),
                "day": date.getDate(),
                "description": description
            };

            if (props.id) {
                transactionData.id = props.id;
            }

            props.onSaveClickedCallBack(transactionData);

            clearFields();
            // const postResponse = await postTransaction();


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


    const renderExpenseForm = () => {
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
                        <div className="nine wide field">{renderCategory()}</div>
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

    const getMenuItemClass = (id) => `item ${id === selectedMenuId ? 'active' : ''}`;
    const onMenuItemClicked = (id) => setSelectedMenuId(id);

    const renderForm = () => {

        switch (selectedMenuId) {
            case 0:
                return renderExpenseForm();
            case 1:
                return <div/>;
            case 2:
                return <div/>;
        }
    };


    return (
        <div className="eight wide column">
            <div className="ui three item menu">
                <a className={getMenuItemClass(0)} onClick={() => onMenuItemClicked(0)}>Expense</a>
                <a className={getMenuItemClass(1)} onClick={() => onMenuItemClicked(1)}>Transfer</a>
                <a className={getMenuItemClass(2)} onClick={() => onMenuItemClicked(2)}>Income</a>
            </div>
            {renderForm()}
        </div>
    );
};

export default InputDataForm;