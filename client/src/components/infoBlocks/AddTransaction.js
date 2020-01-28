import React, {useEffect, useState} from 'react';

const AddTransaction = () => {

    //TODO: from server
    const categoryTypes = ["Food", "Flat"];

    const [accountTypes, setAccountTypes] = useState([]);

    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');
    const [category, setCategory] = useState(categoryTypes[0]);
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
            console.log(account);
            console.log(category);
            console.log(date);
        }
    };


    useEffect(() => {
        // component did mount
        console.log("did mount")

        const fetchData = async () => {
            const response = await fetch("http://localhost:3009/accounts")
            const result = await response.json();
            //

            const accounts = result.map(el => el.name);
            setAccountTypes(accounts);
            setAccount(accounts[1])

        };
        fetchData();
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

    const renderCategory = () => renderOptionsList(categoryTypes, setCategory, category);

    const renderAccount = () => renderOptionsList(accountTypes, setAccount, account);

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