import React, {useState} from 'react';
import Modal from "../popup/Modal";

const EditFieldNamePopup = (props) => {

    const [name, setName] = useState(props.name);
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
                            onClick={onKeyPress}>
                        Save
                    </button>
                </div>
            </form>
        )
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            // onSaveClicked();
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
