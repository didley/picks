import React from "react";
import PropTypes from "prop-types";
import { handleShare } from "./handleShare";

const propTypes = {
  shareData: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
  children: PropTypes.element,
  className: PropTypes.string,
};

class ShareBtn extends React.Component {
  constructor() {
    super();
    this.timeout = null;
    this.state = { alertType: null };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.setState({ alertType: null });
  }

  render() {
    const { shareData, children, className } = this.props;
    const { alertType } = this.state;

    const alert = {
      clipped: <small className="text-green-500">copied</small>,
      error: <small className="text-red-500">error sharing</small>,
    };

    const setAlert = (type) => {
      clearTimeout(this.timeout);
      this.setState({ alertType: type });
      this.timeout = setTimeout(() => {
        if (this.timeout) this.setState({ alertType: null });
      }, 2000);
    };

    const defaultText = children ? (
      children
    ) : (
      <small className="text-blue-500 font-bold">share</small>
    );

    return (
      <button
        onClick={() => handleShare(shareData, setAlert)}
        className={className}
      >
        {alertType ? alert[alertType] : defaultText}
      </button>
    );
  }
}

ShareBtn.propTypes = propTypes;

export default ShareBtn;
