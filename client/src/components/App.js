import React, {useState} from 'react';
import BalanceHeader from "./BalanceHeader";
import Expenses from "./infoBlocks/Expenses";
import BottomBar from "./BottomBar";

const App = () => {

    const [selectedInfoBlock, setSelectedInfoBlock] = useState(null);

    const onButtonClicked =(selectedButtonIndex)=>{
        setSelectedInfoBlock(selectedButtonIndex);
        console.log(selectedButtonIndex)
    };


    return (
        <div className="ui container"
             style={{marginTop: '10px'}}>
            <BalanceHeader/>
            <Expenses/>
            <BottomBar onButtonClicked={onButtonClicked}/>
        </div>
    );

};



export default App;