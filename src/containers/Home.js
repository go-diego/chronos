import React from "react";
import Filter from "../components/Filter";

import Api from "../api/api";

const api = new Api();

export default class Home extends React.Component {
    state = {
        tags: []
    };

    async componentDidMount() {
        const response = await api.getTags();
        const tags = response.map(tag => {
            tag.isActive = true;
            return tag;
        });
        this.setState({tags});
    }

    handleFilter = options => {
        let tags = [...this.state.tags];

        if (options.length === 0) {
            tags.map(tag => {
                tag.isActive = true;
                return tag;
            });
        } else {
            tags.forEach((tag, i) => {
                const intersection = tag.features.filter(feature => options.includes(feature));
                if (
                    intersection.length > 0 &&
                    JSON.stringify(options.sort()) === JSON.stringify(intersection.sort())
                ) {
                    tag.isActive = true;
                } else {
                    tag.isActive = false;
                }
            });
        }

        this.setState({tags});
    };

    render() {
        const {tags} = this.state;
        const uniqueFeatures = []
            .concat(...tags.map(tag => tag.features))
            .filter((tag, i, tags) => {
                return tags.indexOf(tag) === i;
            });

        return (
            <section className="section">
                <div className="is-flex">
                    <h1 className="is-size-2">Tags</h1>
                    {uniqueFeatures.length > 0 && (
                        <Filter filter={this.handleFilter} options={uniqueFeatures} />
                    )}
                </div>
                <ul className="list">
                    {tags.map(tag => {
                        return (
                            tag.isActive && (
                                <li className="list-item" key={tag.tagId}>
                                    <div className="flex">
                                        <p className="is-size-5"> {tag.label}</p>
                                        <div className="tags">
                                            {tag.features.map((feature, i) => {
                                                return (
                                                    <span
                                                        key={i}
                                                        className="tag is-rounded is-warning">
                                                        {feature}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </li>
                            )
                        );
                    })}
                </ul>
            </section>
        );
    }
}
