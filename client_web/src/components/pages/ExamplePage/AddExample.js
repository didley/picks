import React from "react";
import { connect } from "react-redux";
import { addExample } from "globalState/actions";

class AddExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = (input) => {
    this.setState({ input });
  };

  handleAddExample = (e) => {
    e.preventDefault();
    const trimmedInput = this.state.input.trim();
    if (!trimmedInput) return;
    this.props.addExample(trimmedInput);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div className="w-80">
        <form onSubmit={this.handleAddExample} className="grid grid-flow-col">
          <input
            className="border border-purple-700 rounded-lg text-sm p-2"
            placeholder="Add an example text"
            value={this.state.input}
            onChange={(e) => this.updateInput(e.target.value)}
          />
          <button
            className="border rounded-lg p-2 m-1 text-xs"
            onClick={this.handleAddExample}
          >
            Add Example
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addExample })(AddExample);
