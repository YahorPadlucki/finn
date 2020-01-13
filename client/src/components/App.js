import React from 'react';
import BalanceHeader from "./infoBlocks/BalanceHeader";
import ExpensesHistory from "./infoBlocks/ExpensesHistory";
import BottomBar from "./BottomBar";

const App = () => {

    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <BalanceHeader/>
            <ExpensesHistory/>
            <BottomBar style={{marginBottom: '10px'}}/>
        </div>
    );

};

export default App;