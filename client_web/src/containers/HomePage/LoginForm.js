import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logInUserAction } from "actions/authActions";
import { selectAuth } from "reducers/selectors";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) this.props.logInUserAction(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    if (auth.isAuthenticated)
      return <Redirect to={`/profile/${auth.user.username}`} />;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="font-black text-base sm:text-xl mb-2">Login to Picks</h3>

        <div>
          <label className="text-sm">
            Email
            <br />
            <input
              className="rounded-lg text-sm p-1 my-1 border border-purple-400 hover:border-purple-600"
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
              className="rounded-lg text-sm p-1 my-1 border border-purple-400 hover:border-purple-600"
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
            Log in
          </button>
        </div>

        <small>
          Don't have an account?{" "}
          <Link to="/" className="text-purple-500 hover:underline">
            Register
          </Link>
        </small>
      </form>
    );
  }
}

const mapState = (state) => ({ auth: selectAuth(state) });

export default connect(mapState, { logInUserAction })(LoginForm);
