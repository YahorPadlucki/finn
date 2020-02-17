import React from 'react';

const NavigationBar = (props) => {
    const INFO_BLOCK_TYPE = "infoBlock";
    const ADD_TRANSACTION_TYPE = "addTransaction";
    const buttons = [
        {name: "Balance", type: INFO_BLOCK_TYPE},
        {name: "Expenses", type: INFO_BLOCK_TYPE},
        {name: "+", type: ADD_TRANSACTION_TYPE},
        {name: "History", type: INFO_BLOCK_TYPE},
        {name: "Settings", type: INFO_BLOCK_TYPE}
    ];

    const renderButtons = () => {
        return buttons.map((button, i) => {
            return <button key={i} className={getButtonStyle(button.type, i)}
                           onMouseDown={(e) => onButtonClicked(e, button.type, i)}>{button.name}</button>;
        });

    };

    const getButtonStyle = (buttonType, buttonIndex) => {
        //
        // if (buttonType === ADD_TRANSACTION_TYPE) {
        //     return "big ui primary button "
        // }
        return props.selectedButtonIndex === buttonIndex ? "ui active button" : "ui button"
    };

    const onButtonClicked = (e, buttonType, selectedIndex) => {

        // if (buttonType === ADD_TRANSACTION_TYPE) {
        //     e.preventDefault();
        //     return;
        // }

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


export default NavigationBar;