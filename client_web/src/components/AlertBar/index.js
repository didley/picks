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
        bgColor = "blue-500";
        break;
      case "WARNING":
        bgColor = "yellow-400";
        break;
      case "ERROR":
        bgColor = "red-500";
        break;
      case "SUCCESS":
        bgColor = "green-400";
        break;
      case "LOADING":
        bgColor = "purple-600";
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
      <div
        className={`flex w-full text-center items-center bg-${bgColor} text-white`}
      >
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
