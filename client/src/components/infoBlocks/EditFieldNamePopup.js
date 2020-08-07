import React, {useContext, useState} from 'react';
import Modal from "../popup/Modal";
import AppContext from "../context/AppContext";
import {CompactPicker} from 'react-color';


const EditFieldNamePopup = (props) => {

    const {
        getNameFromNameId
    } = useContext(AppContext);
    const [name, setName] = useState(getNameFromNameId(props.fieldToEdit.nameId));
    const [color, setColor] = useState(props.color);

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
                {renderColorPicker()}
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

    const renderColorPicker = function () {
        if (color) {
            return <div className="ui grid">
                <div className="row">
                    <div className="six wide column ">
                        <label>Select Color</label>
                        <CompactPicker
                            color={color}
                            onChangeComplete={handleChangeComplete}/>
                    </div>
                </div>
            </div>;
        }
        return <div/>;

    };

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    const onSaveClicked = async () => {
        // if (isErrorInInputField() || isInputFieldDisabled()) {
        //     setIsInputValid(false);
        // } else {
        //     if (!isInputValid)
        //         setIsInputValid(true);
        //

        if (getNameFromNameId(props.fieldToEdit.nameId) === name)
            return;

        props.onSaveClickedCallBack({nameId: props.fieldToEdit.nameId, name: name});

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
            title={props.title}
            content={renderContent()}
            onDismiss={() => props.OnCancel()}
        />
    );

};

export default EditFieldNamePopup;
