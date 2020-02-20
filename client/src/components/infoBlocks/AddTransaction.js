import React, {useEffect, useState} from 'react';
import {postTransaction} from '../api/serverApi'

const AddTransaction = (props) => {

    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const [date, setDate] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const [isTransactionInProcesss, setIsTransactionInProcesss] = useState(false);
    const [transactionStatusMessage, setTransactionStatusMessage] = useState('');

    let nameInput;

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSaveClicked();
        }
    };

    const onSaveClicked = async () => {
        if (amount.length === 0 || isNaN(amount) || amount <= 0) {
            setIsInputValid(false);
        } else {
            if (!isInputValid)
                setIsInputValid(true);

            console.log(amount);
            console.log(props.selectedAccountName);
            console.log(props.selectedCategory);
            console.log(date);
            console.log(note);

            setIsTransactionInProcesss(true);
            const postResponse = await postTransaction({
                "amount": amount,
                "account": props.selectedAccountName,
                "category": props.selectedCategory,
                "date": date,
                "note": note
            });

            if (postResponse)
                onSaveSuccess();
            else
                onFail();

            setIsTransactionInProcesss(false);
        }
    };

    const clearFields = () => {
        setAmount('');
        setNote('');
    };

    const onSaveSuccess = () => {
        setTransactionStatusMessage("Transaction Saved");
        clearFields();

    };

    const onFail = () => {
        setTransactionStatusMessage("Failed to Save");

    };


    useEffect(() => {
        // component did mount
        console.log("did mount")
        nameInput.focus();
        setCurrentDate();

    }, []);


    const setCurrentDate = function () {
        const date = new Date();
        const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);

        setDate(currentDate);
    };

    const renderAmountInputField = function () {
        const className = `field ${isInputValid ? '' : 'error'}`;
        return (
            <div className={className}>
                {/*<label>Add Transaction</label>*/}
                <input type="text"
                       ref={(input) => {
                           nameInput = input;
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
                       value={note}
                       onChange={e => setNote(e.target.value)}
                       onKeyPress={onKeyPress}
                       placeholder="Note"/>
            </div>
        );
    };

    const renderCategory = () => renderOptionsList(props.categories.map(category => category.name), (categoryName) => props.onCategoryChanged(categoryName), props.selectedCategory);

    const renderAccount = () => renderOptionsList(props.accounts.map(account => account.name), (accountName) => props.onAccountChanged(accountName), props.selectedAccountName);

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
            <input type="date" id="start" name="trip-start"
                   value={date}
                   onChange={e => setDate(e.target.value)}>
            </input>
        );
    };

    const renderAccounts = () => props.accounts.map((acc, i) => <p key={i}>{acc.name}: {acc.balance}</p>);

    const renderBalanceBlock = function () {
        return (
            <div className="ui segment">
                <h3 className="header">Balance</h3>
                {renderAccounts()}
            </div>
        );
    };
    const formClassName = `ui form ${isTransactionInProcesss ? 'loading' : ''}`;


    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>

            <div className="ui centered grid" style={{padding: '10px'}}>
                <div className="four wide column">
                    {renderBalanceBlock()}
                </div>
                <div className="eight wide column">
                    <form className={formClassName} onSubmit={e => e.preventDefault()}>
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
                        </div>
                    </form>

                    <div>{transactionStatusMessage}</div>
                </div>
            </div>
        </div>
    )

};

export default AddTransaction;