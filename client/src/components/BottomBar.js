import React from 'react';

const BottomBar = () => {

    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div className="ui three buttons">
                {renderButtons()}
            </div>


        </div>

    );

};

const renderButtons = () => {
    const buttons = ["One", "Two", "Three"];
    return buttons.map((buttonName, i) => {
        return (
            <button key={i} className="ui button" onClick={onButtonClicked}>{buttonName}</button>
        )
    })

};

const onButtonClicked = (e) => {
    e.currentTarget.className = "ui active button";
};

export default BottomBar;