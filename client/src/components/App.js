import React from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import BottomBar from "./BottomBar";

const App = () => {

    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <BalanceHeader/>
            <Expenses/>
            <BottomBar style={{marginBottom: '10px'}}/>
        </div>
    );

};

export default App;