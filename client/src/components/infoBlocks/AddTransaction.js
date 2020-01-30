import React, {useEffect, useState} from 'react';
import fetchData from "../api/serverApi";
import {ACCOUNTS, CATEGORIES} from "../utils/types";

const AddTransaction = (props) => {

    const [accountNames, setAccountNames] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);

    const [amount, setAmount] = useState('');
    const [selectedAccountName, setAccountSelectedName] = useState('');
    const [selectedCategoryName, setCategorySelectedName] = useState('');

    const [date, setDate] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    let nameInput;

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSaveClicked();
        }
    };

    const onSaveClicked = () => {
        if (amount.length === 0 || isNaN(amount) || amount <= 0) {
            setIsInputValid(false);
        } else {
            if (!isInputValid)
                setIsInputValid(true);
            console.log(amount);
            console.log(selectedAccountName);
            console.log(selectedCategoryName);
            console.log(date);
        }
    };


    useEffect(() => {
        // component did mount
        console.log("did mount")
        initData(ACCOUNTS, setAccountNames, selectAccountName);
        initData(CATEGORIES, setCategoryNames, setCategorySelectedName);
        nameInput.focus();
        setCurrentDate();

    }, []);

    const initData = async (url, setNamesFunction, setSelectedNameFunction) => {
        const result = await fetchData(url);
        const names = result.map(el => el.name);

        setNamesFunction(names);
        setSelectedNameFunction(names[0]);
    };

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
                <label>Add Transaction</label>
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

    const selectAccountName = (accountName)=>{
        setAccountSelectedName(accountName);
        props.onAccountSelected(accountName);
    };

    const renderCategory = () => renderOptionsList(categoryNames, setCategorySelectedName, selectedCategoryName);

    const renderAccount = () => renderOptionsList(accountNames, selectAccountName, selectedAccountName);

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
            <div className="ui segment" style={{textAlign: "center"}}>
                <form className="ui form" onSubmit={e => e.preventDefault()}>
                    {renderInputField()}
                    {renderAccount()}
                    {renderCategory()}
                    {renderCalendar()}
                </form>
                <button className="big ui primary button "
                        onClick={onSaveClicked}>
                    Save
                </button>
            </div>
        </div>
    )

};

export default AddTransaction;