import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../context/AppContext";
import DateSelector from "../utils/DateSelector";


const Expenses = () => {

    const {
        latestTransactions,
        historyTransactions,
        isLoaded,
        loadMoreTransactions,
        isAllTransactionsLoaded,
        fetchHistoryTransactions
    } = useContext(AppContext);

    const [selectedDate, setSelectedDate] = useState({month: 1, year: 2020});


    useEffect(() => {
        fetchHistoryTransactions(selectedDate.year, selectedDate.month);

    }, [selectedDate]);
    return (
        <div className="ui container"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <div>Expenses:</div>
            <DateSelector
                onSelectedDateChanged={fetchHistoryTransactions}/>
        </div>

    );
};

export default Expenses;