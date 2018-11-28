import React from "react";
import Home from "../containers/Home";
import {shallow, mount} from "enzyme";

const props = {
    history: {
        push: jest.fn()
    }
};

const tags = [
    {
        tagId: "Tag1",
        label: "Power at Meter 1",
        dataType: "double",
        unit: "kW",
        isTransient: false,
        features: ["power", "meter", "load", "consumption"],
        isActive: true
    }
];

it("should render Home component", () => {
    shallow(<Home />);
});

it("should route to Details", () => {
    let wrapper = mount(<Home {...props} />);
    wrapper.setState({tags});
    wrapper
        .find("li.list-item")
        .first()
        .simulate("click");
    expect(props.history.push).toBeCalledWith(`details/${tags[0].tagId}`);
});
