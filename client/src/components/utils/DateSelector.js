import React, {useEffect, useState} from 'react';


const DateSelector = (props) => {

    const [selectedDate, setSelectedDate] = useState({});

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();

        setSelectedDate({month, year});
    }, []);

    useEffect(() => {
        if (selectedDate.month && selectedDate.year)
            props.onSelectedDateChanged(selectedDate.month, selectedDate.year);
    }, [selectedDate]);


    const setSelectedMonth = (month) => {
        setSelectedDate({month, year: selectedDate.year});
    };

    const setSelectedYear = (year) => {
        setSelectedDate({month: selectedDate.month, year});
    };

    return (
        <div>
            <select className="ui search dropdown"
                    value={selectedDate.month}
                    onChange={e => setSelectedMonth(e.target.value)}>
                <option value="0">Jan</option>
                <option value="1">Feb</option>
                <option value="2">Mar</option>
                <option value="3">Apr</option>
                <option value="4">May</option>
                <option value="5">Jun</option>
                <option value="6">Jul</option>
                <option value="7">Aug</option>
                <option value="8">Sep</option>
                <option value="9">Oct</option>
                <option value="10">Nov</option>
                <option value="11">Dec</option>
            </select>
            <select className="ui search dropdown"
                    value={selectedDate.year}
                    onChange={e => setSelectedYear(e.target.value)}>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
            </select>
        </div>
    )


};

export default DateSelector