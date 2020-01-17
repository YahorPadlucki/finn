import React, {useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import BottomBar from "./BottomBar";
import Balance from "./infoBlocks/Balance";
import History from "./infoBlocks/History";
import AddTransactionPopup from "./AddTransactionPopup";

const App = () => {

    const [selectedInfoBlock, setSelectedInfoBlock] = useState(1);

    const onButtonClicked = (selectedButtonIndex) => {
        setSelectedInfoBlock(selectedButtonIndex);
        console.log(selectedButtonIndex)
    };

    const renderInfoBlock = () => {
        switch (selectedInfoBlock) {
            case 0:
                return <Balance/>;
            case 1:
                return <Expenses/>;
            case 3:
                return <History/>;
            default:
                return null;
        }

    };


    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <BalanceHeader/>
            {renderInfoBlock()}
            <AddTransactionPopup/>
            <BottomBar
                selectedButtonIndex={selectedInfoBlock}
                onButtonClicked={onButtonClicked}/>
        </div>
    );

};


export default App;