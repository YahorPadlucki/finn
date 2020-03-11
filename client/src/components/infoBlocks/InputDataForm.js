import React, {useContext, useEffect, useState} from 'react';
import AccountsContext from "../context/AccountsContext";
import CategoriesContext from "../context/CategoriesContext";

const InputDataForm = (props) => {

    const {accounts} = useContext(AccountsContext);
    const {categories} = useContext(CategoriesContext);

    const [isInputValid, setIsInputValid] = useState(true);
    const [date, setDate] = useState(props.date);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const [selectedAccountName, setSelectedAccountName] = useState(props.selectedAccountName);
    const [selectedCategoryName, setSelectedCategoryName] = useState(props.selectedCategoryName);

    let nameInput;


    useEffect(() => {
        // component did mount
        console.log("did mount")
        nameInput.focus();

        if (!date) {
            setCurrentDate();
        }

    }, []);


    const setCurrentDate = function () {
        const date = new Date();
        const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
            '-' + date.getDate().toString().padStart(2, 0);

        setDate(currentDate);
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
            <input type="date" id="start" name="trip-start"
                   value={date}
                   onChange={e => setDate(e.target.value)}>
            </input>
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

            props.onSaveClickedCallBack({
                "total": amount,
                "account": selectedAccountName ? selectedAccountName : props.selectedAccountName,
                "category": selectedCategoryName ? selectedCategoryName : props.selectedCategoryName,
                "date": date,
                "description": description
            });

            clearFields();
            // const postResponse = await postTransaction();


        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSaveClicked();
        }
    };
    const formStateClassName = `ui form ${!props.isLoaded ? 'loading' : ''}`;

    return (
        <div className="eight wide column">

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
                </div>
            </form>
        </div>
    );
};

export default InputDataForm;