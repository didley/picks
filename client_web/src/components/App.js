import React from "react";

import AddExample from "./examples/AddExample";
import ExampleList from "./examples/ExampleList";

class App extends React.Component {
  render() {
    return (
      <div>
        <AddExample />
        <ExampleList />
      </div>
    );
  }
}

export default App;
