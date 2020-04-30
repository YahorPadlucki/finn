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
    const [total, setTotal] = useState(0);


    useEffect(() => {
        fetchHistoryTransactions(selectedDate.year, selectedDate.month);

    }, [selectedDate]);

    useEffect(() => {

        if (historyTransactions.length) {
            const total = historyTransactions.reduce((total, transaction) => total + transaction.total, 0);
            setTotal(total);
        }

    }, [historyTransactions]);


    const renderTable = () => {

        const combinedCategories = [];

        historyTransactions.forEach(transaction => {
            if (!combinedCategories.length) {
                combinedCategories.push({...transaction});
            } else {

                const cobinedCategorie = combinedCategories.filter(tr => tr.category === transaction.category)[0];
                if (!cobinedCategorie)
                    combinedCategories.push({...transaction});
                else
                    cobinedCategorie.total += transaction.total;
            }

        });


        return combinedCategories.map((transaction, index) => {
            return (
                <tr>
                    <td>None</td>
                    <td>{transaction.category}</td>
                    <td>{((transaction.total / total) * 100).toFixed(1) + "%"}</td>
                    <td>{transaction.total}</td>
                </tr>
            );
        });
    };

    return (
        <div className="ui segment"
             style={{border: '1px solid rgba(34,36,38,.15)'}}>
            <DateSelector
                onSelectedDateChanged={fetchHistoryTransactions}/>
            <h4 style={{textAlign: 'right'}}>Expenses total: {total}</h4>

            <table className="ui celled table unstackable">
                <thead>
                <tr>
                    <th className="two wide">Color</th>
                    <th className="ten wide">Category</th>
                    <th className="two wide">Percent</th>
                    <th className="two wide">Total</th>
                </tr>
                </thead>
                <tbody>
                {renderTable()}
                </tbody>
            </table>
        </div>

    );
};

export default Expenses;