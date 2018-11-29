import React from "react";
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from "react-vis";

export default function TimeSeries(props) {
    const {data, xAxisTitle, yAxisTitle, yDomain} = props;
    return (
        <XYPlot yDomain={yDomain || null} xType="time" width={1200} height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title={xAxisTitle} />
            <YAxis title={yAxisTitle} />
            <LineSeries data={data} style={{stroke: "violet", strokeWidth: 1}} />
        </XYPlot>
    );
}
