import { nav } from "utils/history";

const PageNotFound = () => {
  return (
    <div className="m-5">
      <h1>404</h1>
      <p>
        Page not found{" "}
        <button
          className="underline"
          onClick={() => {
            nav("/#login");
          }}
        >
          Return home
        </button>{" "}
      </p>
    </div>
  );
};

export default PageNotFound;
