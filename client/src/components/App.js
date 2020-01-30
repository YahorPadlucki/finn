import React, {useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import BottomBar from "./BottomBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransaction from "./infoBlocks/AddTransaction";

const App = () => {

    const [selectedInfoBlock, setSelectedInfoBlock] = useState(2);
    const [selectedAccountName, setSelectedAccountName] = useState('');


    const onTabButtonClicked = (selectedButtonIndex) => {
        setSelectedInfoBlock(selectedButtonIndex);
        console.log(selectedButtonIndex)
    };

    const onAccountSelected = (selectedAccountName) => {
        setSelectedAccountName(selectedAccountName);
    };

    const renderInfoBlock = () => {
        switch (selectedInfoBlock) {
            case 0:
                return <Balance/>;
            case 1:
                return <Expenses/>;
            case 2:
                return <AddTransaction onAccountSelected={onAccountSelected}/>;
            case 3:
                return <History/>;
            default:
                return null;
        }

    };


    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <BalanceHeader selectedAccountName={selectedAccountName}/>
            {renderInfoBlock()}
            <BottomBar
                selectedButtonIndex={selectedInfoBlock}
                onButtonClicked={onTabButtonClicked}/>
        </div>
    );

};


export default App;