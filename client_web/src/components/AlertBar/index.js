import React from "react";
import AlertIcon from "./AlertIcon";
import { connect } from "react-redux";
import { clearAlert } from "actions/alertActions";

class AlertBar extends React.Component {
  render() {
    const { alert } = this.props;

    let bgColor;
    switch (alert.style) {
      case "GENERAL":
        bgColor =
          "z-10 sticky top-0 flex w-full text-center items-center bg-blue-500 text-white";
        break;
      case "WARNING":
        bgColor =
          "z-10 sticky top-0 flex w-full text-center items-center bg-yellow-400 text-white";
        break;
      case "ERROR":
        bgColor =
          "z-10 sticky top-0 flex w-full text-center items-center bg-red-500 text-white";
        break;
      case "SUCCESS":
        bgColor =
          "z-10 sticky top-0 flex w-full text-center items-center bg-green-400 text-white";
        break;
      case "LOADING":
        bgColor =
          "z-10 sticky top-0 flex w-full text-center items-center bg-purple-600 text-white";
        break;
      default:
        bgColor = "blue-500";
    }

    let messageWithDetails = (
      <details className="flex-grow text-sm items-center my-2">
        <summary>{alert.message}</summary>
        <p className="text-xs">{alert.details}</p>
      </details>
    );

    if (!alert.message) return <div />;

    return (
      <div className={bgColor}>
        <AlertIcon
          className="flex-none items-center m-3"
          alertType={alert.style}
        />
        {alert.details ? (
          messageWithDetails
        ) : (
          <div className="flex-grow text-sm items-center">{alert.message}</div>
        )}
        <div
          className="flex-none items-center m-3"
          onClick={() => this.props.clearAlert()}
        >
          X
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  alert: state.alert,
});

export default connect(mapState, { clearAlert })(AlertBar);
