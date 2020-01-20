import React, {useEffect, useState} from 'react';

const AddTransaction = () => {
    const [amount, setAmount] = useState('');
    let nameInput;

    const onSubmit = (e) => {
        e.preventDefault();

        // this.setState({term: e.target.value})
        // props.onSubmit(this.state.term)
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
                <option value="">State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
            </select>
        );
    };
    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className="ui segment">
                <form className="ui form" onSubmit={() => onSubmit()}>
                    {renderInputForm()}
                    {renderCategory()}
                </form>
            </div>
        </div>
    )

};

export default AddTransaction;