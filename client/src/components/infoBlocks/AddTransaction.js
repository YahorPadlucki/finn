import React, {useEffect, useState} from 'react';

const AddTransaction = () => {
    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    let nameInput;

    const onSaveClicked = (e) => {
        console.log(amount);
        console.log(category);
        console.log(account);
    };


    useEffect(() => {
        // component did mount
        console.log("effect")
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
        return (
            <div className="field">
                <label>Add Transaction</label>
                <input type="text"
                       ref={(input) => {
                           nameInput = input;
                       }}
                       value={amount}
                       onChange={e => setAmount(e.target.value)}/>
            </div>
        );
    };
    const renderCategory = function () {
        return (
            <select className="ui search dropdown"
                    onChange={e => setCategory(e.target.value)}>
                <option value="">Category</option>
                <option value="Food">Food</option>
                <option value="Flat">Flat</option>
            </select>
        );
    };

    const renderAccount = function () {
        return (
            <select className="ui search dropdown"
                    onChange={e => setAccount(e.target.value)}>
                <option value="">Account</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
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
                    {renderCategory()}
                    {renderAccount()}
                    {renderCalendar()}
                </form>
                <button className="big ui primary button " onClick={onSaveClicked}>Save</button>
            </div>
        </div>
    )

};

export default AddTransaction;