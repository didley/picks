import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Link to="signin">Sign-in</Link>
      <form className="container bg-green-100 rounded-lg m-5 py-10 px-20">
        <h1 className="font-black text-4xl p-2 m-3">Sign-up</h1>
        <div>
          <label className="text-sm">
            Username
            <br />
            <input
              className="rounded-lg text-sm p-1 my-1 border border-green-400"
              type="text"
              required
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
            />
          </label>
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

export default Signup;
