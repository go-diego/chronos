import React from "react";
import TimeSeries from "../components/TimeSeries";
import format from "date-fns/format";

import Api from "../api/api";

const api = new Api();

export default class Details extends React.Component {
    state = {
        startTS: api.defaultTimeSeriesRange.startTS,
        endTS: api.defaultTimeSeriesRange.endTS,
        tag: {},
        tagData: []
    };

    async componentDidMount() {
        const {tagId} = this.props.match.params;
        const tag = await api.getTagById(tagId);
        const tagData = await api.getData(tagId);
        this.setState({tag, tagData});
    }

    render() {
        const {startTS, endTS, tag, tagData} = this.state;
        const {tagId} = this.props.match.params;

        console.log("tag", tag);
        console.log("tagData", tagData);

        let data = [];
        let yAxisTitle = "";
        switch (tag.unit) {
            case "Status":
                yAxisTitle = tag.unit;
                data = tagData.map(datum => {
                    return {
                        x: new Date(datum.observationTS).getTime(),
                        y: datum.value === "On" ? 1 : 0
                    };
                });
                break;
            case "V":
                yAxisTitle = `${tag.unit} (in the thousands)`;
                data = tagData.map(datum => {
                    return {
                        x: new Date(datum.observationTS).getTime(),
                        y: parseFloat(datum.value / 1000)
                    };
                });
                break;
            default:
                yAxisTitle = tag.unit;
                data = tagData.map(datum => {
                    return {
                        x: new Date(datum.observationTS).getTime(),
                        y: datum.value
                    };
                });
        }

        console.log("DATA", data);
        return (
            <div className="section">
                <div className="is-flex">
                    <h1 className="is-size-2">{tagId}</h1>
                </div>
                <TimeSeries
                    data={data}
                    yAxisTitle={yAxisTitle}
                    xAxisTitle={`Time over ${format(new Date(startTS), "MM/DD")} - ${format(
                        new Date(endTS),
                        "MM/DD"
                    )}`}
                />
            </div>
        );
    }
}
