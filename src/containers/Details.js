import React from "react";
import TimeSeries from "../components/TimeSeries";
import DateSelect from "../components/DateSelect";
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

    handleChangeStartDate = date => {
        this.setState({startTS: format(new Date(date), "YYYY-MM-DD")}, () => this.getDataByDate());
    };

    handleChangeEndDate = date => {
        this.setState({endTS: format(new Date(date), "YYYY-MM-DD")}, () => this.getDataByDate());
    };

    async getDataByDate() {
        const {tagId} = this.props.match.params;
        const {startTS, endTS} = this.state;
        const tagData = await api.getData(tagId, startTS, endTS);
        this.setState({tagData});
    }

    render() {
        const {startTS, endTS, tag, tagData} = this.state;
        const {tagId} = this.props.match.params;

        console.log("tag", tag);
        console.log("tagData", tagData);

        let data = [];
        let yAxisTitle = "";
        let yDomain = null;
        switch (tag.unit) {
            case "Status":
                yDomain = [0, 1];
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
                <h1 className="is-size-2">{tagId}</h1>
                <div className="is-flex">
                    <div className="padding">
                        <h6>Start Date</h6>
                        <DateSelect
                            onChange={this.handleChangeStartDate}
                            date={new Date(startTS)}
                        />
                    </div>
                    <div className="padding">
                        <h6>End Date</h6>

                        <DateSelect onChange={this.handleChangeEndDate} date={new Date(endTS)} />
                    </div>
                </div>
                <TimeSeries
                    yDomain={yDomain}
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
