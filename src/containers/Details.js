import React from "react";

import Api from "../api/api";

const api = new Api();

export default class Details extends React.Component {
    state = {
        startTS: api.defaultTimeSeriesRange.startTS,
        endTS: api.defaultTimeSeriesRange.endTS
    };

    async componentDidMount() {
        const {tagId} = this.props.match.params;
        const data = await api.getData(tagId);
        console.log("DATA", data);
    }

    render() {
        const {startTS, endTS} = this.state;
        const {tagId} = this.props.match.params;
        console.log("startTS", startTS);
        console.log("endTS", endTS);

        return (
            <div className="section">
                <div className="is-flex">
                    <h1 className="is-size-2">{tagId}</h1>
                </div>
            </div>
        );
    }
}
