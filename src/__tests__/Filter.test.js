import React from "react";
import Filter from "../components/Filter";
import {shallow, mount} from "enzyme";

const props = {options: ["option1", "option2", "option2"], filter: jest.fn()};

it("should render Filter component", () => {
    shallow(<Filter {...props} />);
});

it("should fire Filter function on option toggle", () => {
    let wrapper = mount(<Filter {...props} />);
    wrapper
        .find("span.tag")
        .first()
        .simulate("click");
    expect(props.filter).toBeCalledWith(["option1"]);
});
