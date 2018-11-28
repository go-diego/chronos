import React from "react";
import Api from "../api/api";

const api = new Api();

export default class Home extends React.Component {
    state = {
        tags: []
    };

    async componentDidMount() {
        const tags = await api.getTags();
        console.log("TAGS", tags);

        this.setState({tags});
    }

    render() {
        const {tags} = this.state;
        return (
            <section className="section">
                <h1 className="is-size-2">Tags</h1>
                <ul className="list">
                    {tags.map(tag => {
                        return (
                            <li className="list-item" key={tag.tagId}>
                                <div className="flex">
                                    <p className="is-size-5"> {tag.label}</p>
                                    <div className="tags">
                                        {tag.features.map((feature, i) => {
                                            return (
                                                <span key={i} className="tag is-rounded is-warning">
                                                    {feature}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }
}
