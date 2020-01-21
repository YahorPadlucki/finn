import React, {useEffect, useState} from 'react';

const AddTransaction = () => {
    const [amount, setAmount] = useState('');
    let nameInput;

    const onSubmit = (e) => {
        e.preventDefault();

        // this.setState({term: e.target.value})
        // props.onSubmit(this.state.term)
        console.log( e.target.value)
    };

    useEffect(() => {
// component did mount
        nameInput.focus();
    }, []);

    const renderInputForm = function () {
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
            <select className="ui search dropdown">
                <option value="">Category</option>
                <option value="AL">Food</option>
                <option value="AK">Flat</option>
            </select>
        );
    };

    const renderAccount = function () {
        return (
            <select className="ui search dropdown">
                <option value="">Account</option>
                <option value="AL">Card</option>
                <option value="AK">Cash</option>
            </select>
        );
    };
    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className="ui segment" style={{textAlign: "center"}}>
                <form className="ui form" onSubmit={() => onSubmit()}>
                    {renderInputForm()}
                    {renderCategory()}
                    {renderAccount()}
                    <input type="date" id="start" name="trip-start"
                           value="2018-07-22">
                    </input>
                </form>
                <button className="big ui primary button ">Save</button>
            </div>
        </div>
    )

};

export default AddTransaction;