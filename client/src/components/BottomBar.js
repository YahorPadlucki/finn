import React, {useState} from 'react';

const BottomBar = (props) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

    const renderButtons = () => {
        const buttons = ["One", "Two", "Three"];
        return buttons.map((buttonName, i) => {
            return <button key={i} className={selectedButtonIndex === i ? "ui active button" : "ui button"}
                           onClick={(e) => onButtonClicked(e, i)}>{buttonName}</button>;
        });

    };

    const onButtonClicked = (e, selectedButtonIndex) => {
        setSelectedButtonIndex(selectedButtonIndex);
        props.onButtonClicked(selectedButtonIndex);
    };

    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className="ui three buttons">
                {renderButtons()}
            </div>
        </div>
    );
};


export default BottomBar;