import React from "react";

import Api from "../api/api";

const api = new Api();

export default class Details extends React.Component {
    async componentDidMount() {
        console.log("PROPS", this.props);
        const {tagId} = this.props.match.params;
        const data = await api.getData(tagId);
        console.log("DATA", data);
    }

    render() {
        const {tagId} = this.props.match.params;
        return (
            <div className="section">
                <div className="is-flex">
                    <h1 className="is-size-2">{tagId}</h1>
                </div>
            </div>
        );
    }
}
