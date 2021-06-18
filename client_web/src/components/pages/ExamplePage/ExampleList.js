import React from "react";
import { connect } from "react-redux";
import { getExamplesList } from "globalState/selectors";

import Example from "./Example";

const ExampleList = ({ examples }) => (
  <ul>
    {examples && examples.length
      ? examples.map(({ text, id }) => <Example key={id} example={text} />)
      : "No examples added. Go ahead, Add one!"}
  </ul>
);

export default connect(getExamplesList)(ExampleList);
