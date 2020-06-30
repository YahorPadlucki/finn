import React, {useState, useContext} from 'react';
import Modal from "../popup/Modal";
import AppContext from "../context/AppContext";

const EditFieldNamePopup = (props) => {

    const [name, setName] = useState(props.fieldToEdit.name);
    const {
        editName
    } = useContext(AppContext);
    const formStateClassName = `ui form ${!props.isLoaded ? 'loading' : ''}`;


    const renderContent = () => {
        return (
            <form className={formStateClassName} onSubmit={e => e.preventDefault()}>
                <div className="field">
                    <input type="text"
                           value={name}
                           onChange={e => setName(e.target.value)}
                           onKeyPress={onKeyPress}
                    />
                </div>
                <div style={{textAlign: 'right'}}>
                    <button className="big ui primary button "
                            onClick={onSaveClicked}>
                        Save
                    </button>
                    <button className='big ui button'
                            onClick={() => props.OnCancel()}>
                        Cancel
                    </button>
                </div>
            </form>
        )
    };

    const onSaveClicked = async () => {
        // if (isErrorInInputField() || isInputFieldDisabled()) {
        //     setIsInputValid(false);
        // } else {
        //     if (!isInputValid)
        //         setIsInputValid(true);
        //

        if (props.fieldToEdit.name === name)
            return;

        editName(props.fieldToEdit.nameId, props.fieldToEdit.name, name);


        // props.onSaveClickedCallBack(transactionData, transactionType);

        // clearFields();
        // const postResponse = await postTransaction();
    };


    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSaveClicked();
        }

    };

    return (
        <Modal
            title="Edit name"
            content={renderContent()}
            onDismiss={() => props.OnCancel()}
        />
    );

};

export default EditFieldNamePopup;
