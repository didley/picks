import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div>
      Signin
      <Link to="signup">Sign-up</Link>
      <form className="container bg-green-100 rounded-lg m-5 p-5">
        <h1 className="font-black text-4xl p-2 m-3">Sign-up</h1>
        <div>
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <br />
          <input
            className="rounded-lg text-sm p-1 my-1 border border-green-400"
            type="text"
            name="username"
            id="username"
            required
          />
        </div>

        <div>
          <label className="text-sm" htmlFor="email">
            Email{" "}
          </label>
          <br />
          <input
            className="rounded-lg text-sm p-1 my-1 border border-green-400"
            type="email"
            name="email"
            id="email"
            required
          />
        </div>

        <div>
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="rounded-lg text-sm p-1 my-1 border border-green-400"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <div>
          <input
            className="bg-white text-xs rounded-lg p-1 px-3 my-3 border border-purple-700 hover:bg-purple-100"
            type="submit"
            value="Sign-in"
          />
        </div>
      </form>
    </div>
  );
};

export default Signin;
