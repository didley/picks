import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpRequestAction } from "actions/authActions";
import { selectAuth } from "reducers/selectors";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
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
    const { username, email, password } = this.state;
    if (username && email && password) {
      this.props.signUpRequestAction(username, email, password);
    }
  };

  render() {
    const { username, email, password } = this.state;
    const { auth } = this.props;

    if (auth.isAuthenticated)
      return <Redirect to={`/profile/${auth.user.username}`} />;

    return (
      <div>
        <Link to="login">Log In</Link>
        <form
          className="container bg-green-100 rounded-lg m-5 py-10 px-20"
          onSubmit={this.handleSubmit}
        >
          <h1 className="font-black text-4xl p-2 m-3">Create an account</h1>
          <div>
            <label className="text-sm">
              Username
              <br />
              <input
                className="rounded-lg text-sm p-1 my-1 border border-green-400"
                type="text"
                required
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label className="text-sm" htmlFor="email">
              Email
              <br />
              <input
                className="rounded-lg text-sm p-1 my-1 border border-green-400"
                type="email"
                required
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label className="text-sm" htmlFor="password">
              Password
              <br />
              <input
                className="rounded-lg text-sm p-1 my-1 border border-green-400"
                type="password"
                required
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <button className="bg-white text-xs rounded-lg p-1 px-3 my-3 border border-purple-400 hover:bg-purple-100">
              Sign-up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({ auth: selectAuth(state) });

export default connect(mapState, { signUpRequestAction })(SignUpPage);
