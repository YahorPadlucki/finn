import React, {useState} from 'react';
import Modal from "../popup/Modal";

const EditFieldNamePopup = (props) => {

    const [name, setName] = useState(props.fieldToEdit.name);
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

        console.log("name id: "+props.fieldToEdit.nameId);
        console.log("name: "+props.fieldToEdit.name);
        console.log("new name: "+name);

            const nameData = {
            };


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
