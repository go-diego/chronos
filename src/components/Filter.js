import React from "react";

export default class Filter extends React.Component {
    state = {
        filterOptions: []
    };

    componentDidMount() {
        const {options} = this.props;

        const filterOptions = options.map(option => {
            return {label: option, active: false};
        });

        this.setState({filterOptions});
    }

    handleToggleOption = index => {
        const {filter} = this.props;
        const filterOptions = [...this.state.filterOptions];
        filterOptions[index].active = !filterOptions[index].active;
        this.setState({filterOptions}, () => {
            const options = filterOptions
                .filter(option => option.active)
                .map(option => option.label);
            filter(options);
        });
    };

    render() {
        const {filterOptions} = this.state;

        return (
            <div className="tags">
                {filterOptions.map((option, i) => {
                    return (
                        <span
                            key={i}
                            onClick={() => this.handleToggleOption(i)}
                            className={`click is-medium tag ${
                                option.active ? "is-success" : "is-light"
                            }`}>
                            {option.label}
                            {option.active && <button className="delete is-small" />}
                        </span>
                    );
                })}
            </div>
        );
    }
}
