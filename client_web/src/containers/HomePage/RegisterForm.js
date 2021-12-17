import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpRequestAction } from "actions/authActions";
import { selectAuth } from "reducers/selectors";
import { setWarningAlert } from "actions/alertActions";
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    this.props.setWarningAlert({
      message:
        "This app is currently in pre release, your account and data may be deleted at any time",
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    const pwConfirmed = password === confirmPassword;

    if (username && email && password && confirmPassword && pwConfirmed) {
      this.props.signUpRequestAction(username, email, password);
    }
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;
    const { auth } = this.props;
    const pwConfirmed = password === confirmPassword;
    const showPwMismatchWarn = confirmPassword && !pwConfirmed;

    if (auth.isAuthenticated)
      return <Redirect to={`/profile/${auth.user.username}`} />;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3 className="font-black text-base sm:text-xl mb-2">
            Create a Picks account
          </h3>
          <div>
            <label className="text-sm">
              Username
              <br />
              <input
                className="rounded-lg p-1 my-1 border border-green-400 hover:border-green-600"
                type="text"
                required
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label className="text-sm">
              Email
              <br />
              <input
                className="rounded-lg p-1 my-1 border border-green-400 hover:border-green-600"
                type="email"
                required
                name="email"
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
                className="rounded-lg p-1 my-1 border border-green-400 hover:border-green-600"
                type="password"
                required
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <div>
            <label className="text-sm">
              Confirm password
              <br />
              <input
                className={
                  showPwMismatchWarn
                    ? "rounded-lg p-1 my-1 border border-red-500"
                    : "rounded-lg p-1 my-1 border border-green-400 hover:border-green-600"
                }
                type="password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
            </label>
          </div>
          {showPwMismatchWarn && (
            <small className="text-red-500">Passwords don't match</small>
          )}

          <div>
            <button className="bg-white text-xs rounded-lg p-1 px-3 my-3 border border-purple-400 hover:bg-purple-100">
              Sign up
            </button>
          </div>

          <small>
            Already have an account?{" "}
            <Link to="/#login" className="text-green-400 hover:underline">
              Log in
            </Link>
          </small>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({ auth: selectAuth(state) });

export default connect(mapState, { signUpRequestAction, setWarningAlert })(
  RegisterForm
);
