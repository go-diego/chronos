import React from "react";
import Details from "../containers/Details";
import {shallow} from "enzyme";

it("should render Details component", () => {
    const props = {
        match: {
            params: "Tag1"
        }
    };
    shallow(<Details {...props} />);
});
