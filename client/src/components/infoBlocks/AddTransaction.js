import React, {useEffect, useState} from 'react';
import {postTransaction} from '../api/serverApi'

const AddTransaction = (props) => {

    const [amount, setAmount] = useState('');

    const [date, setDate] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
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
            console.log(props.selectedAccount);
            console.log(props.selectedCategory);
            console.log(date);

            await postTransaction({
                "amount": amount,
                "account": props.selectedAccount,
                "category": props.selectedCategory,
                "date": date
            });
            setTransactionStatusMessage("DOne");
        }
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

    const renderInputField = function () {
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
                       onKeyPress={onKeyPress}/>
            </div>
        );
    };

    const renderCategory = () => renderOptionsList(props.categories, (categoryName) => props.onCategoryChanged(categoryName), props.selectedCategory);

    const renderAccount = () => renderOptionsList(props.accounts, (accountName) => props.onAccountChanged(accountName), props.selectedAccount);

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
    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>

            <div className="ui centered grid" style={{padding: '10px'}}>

                <div className="four wide column">
                    <div>Balance</div>
                    <div>Cash:1000</div>
                    <div>Card:3000</div>
                </div>
                <div className="eight wide column">
                    <form className="ui form" onSubmit={e => e.preventDefault()}>
                        <div className="field">
                            <label>Account</label>
                            <div className="fields">
                                <div className="nine wide field">{renderAccount()}</div>
                                <div className="seven wide field">{renderInputField()}</div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Category</label>
                            <div className="fields">
                                <div className="nine wide field">{renderCategory()}</div>
                                <div className="seven wide field">{renderCalendar()}</div>
                            </div>
                        </div>

                    </form>
                    <div style={{textAlign:'right'}}>
                        <button className="big ui primary button "
                                onClick={onSaveClicked}>
                            Save
                        </button>
                    </div>
                    <div>{transactionStatusMessage}</div>
                </div>
            </div>
        </div>
    )

};

export default AddTransaction;