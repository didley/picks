import React from "react";
import { Link } from "react-router-dom";
import { logInUser } from "actions/actions";

class LogInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      submitted: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) logInUser(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <Link to="signup">Sign Up</Link>
        <form
          onSubmit={this.handleSubmit}
          className="container bg-purple-100 rounded-lg m-5 py-10 px-20"
        >
          <h1 className="font-black text-4xl p-2 m-3">Log in to Picks</h1>

          <div>
            <label className="text-sm">
              Email
              <br />
              <input
                className="rounded-lg text-sm p-1 my-1 border border-purple-400"
                type="email"
                name="email"
                required
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label className="text-sm">
              Password
              <br />
              <input
                className="rounded-lg text-sm p-1 my-1 border border-purple-400"
                type="password"
                name="password"
                required
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <button className="bg-white text-xs rounded-lg p-1 px-3 my-3 border border-green-400 hover:bg-green-100">
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogInPage;
