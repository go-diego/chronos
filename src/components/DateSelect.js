import React from "react";
import DatePicker from "react-date-picker";

export default function DateSelect(props) {
    const {date, onChange} = props;
    return <DatePicker value={date} onChange={onChange} />;
}
