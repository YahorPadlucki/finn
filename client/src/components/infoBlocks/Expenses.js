import React, {useContext, useEffect, useRef, useState} from 'react';
import AppContext from "../context/AppContext";
import DateSelector from "../utils/DateSelector";
import {SPEND_TYPE} from "../api/types";
import Chart from "chart.js"


const Expenses = () => {

    const {
        categories,
        historyTransactions,
        isLoaded,
        loadMoreTransactions,
        isAllTransactionsLoaded,
        fetchHistoryTransactions
    } = useContext(AppContext);

    const [selectedDate, setSelectedDate] = useState({month: 1, year: 2020});
    const [total, setTotal] = useState(0);

    const canvasRef = useRef(null);


    useEffect(() => {
        fetchHistoryTransactions(selectedDate.year, selectedDate.month);
    }, [selectedDate]);


    useEffect(() => {

        if (historyTransactions.length) {
            const total = historyTransactions.reduce((total, transaction) => {
                let spendAmount = 0;
                if (transaction.type === SPEND_TYPE)
                    spendAmount = transaction.total;

                return total + spendAmount;
            }, 0);
            setTotal(total);
        }


    }, [historyTransactions]);

    const getTransactionColor = (transaction) => {
        if (categories && categories.length) {

            return categories.filter((category) => category.name === transaction.category)[0].color

        }
        return "";
    };

    const renderTable = () => {

        const combinedCategories = [];

        historyTransactions.forEach(transaction => {

            if (transaction.type === SPEND_TYPE) {
                if (!combinedCategories.length) {
                    combinedCategories.push({...transaction});
                } else {

                    const cobinedCategorie = combinedCategories.filter(tr => tr.category === transaction.category)[0];
                    if (!cobinedCategorie)
                        combinedCategories.push({...transaction});
                    else
                        cobinedCategorie.total += transaction.total;
                }
            }

        });

        drawChart(combinedCategories);


        return combinedCategories.map((transaction, index) => {
            return (
                <tr>
                    <td>{getTransactionColor(transaction)}</td>
                    <td>{transaction.category}</td>
                    <td>{((transaction.total / total) * 100).toFixed(1) + "%"}</td>
                    <td>{transaction.total}</td>
                </tr>
            );
        });
    };


    function drawChart(combinedCategories) {
        const canvas = canvasRef.current;
        if (!canvas) return; // Todo
        const ctx = canvas.getContext('2d');

        const labels = [];
        const data = [];
        combinedCategories.forEach(transaction => {
            labels.push(transaction.category);
            data.push(transaction.total);
        });


        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',

            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
                    data: data
                }]
            },

            // Configuration options go here
            options: {}
        });
    }

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

            <canvas
                ref={canvasRef}
            />

        </div>

    );
};

export default Expenses;