import React from 'react';

const BottomBar = (props) => {

    const renderButtons = () => {
        return props.buttons.map((buttonName, i) => {
            return <button key={i} className={getButtonStyle(i)}
                           onClick={(e) => onButtonClicked(e, i)}>{buttonName} </button>;
        });

    };

    const getButtonStyle = (buttonIndex) => {

        if (buttonIndex === 2) {
            return "big ui primary button "
        }
        return props.selectedButtonIndex === buttonIndex ? "ui active button" : "ui button"
    };

    const onButtonClicked = (e, selectedIndex) => {
        if (selectedIndex === 2)
            return;

        props.onButtonClicked(selectedIndex);
    };

    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)', textAlign: 'center'}}>
            <div className="ui five buttons">
                {renderButtons()}
            </div>
        </div>
    );
};


export default BottomBar;