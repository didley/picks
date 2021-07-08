const AlertIcon = ({ alertType, className }) => {
  const icons = {
    GENERAL: { symbol: "🙋‍♂️", alt: "man raising one hand" },
    WARNING: { symbol: "🧙‍♀️", alt: "friendly old sorceress" },
    ERROR: { symbol: "🙅‍♀️", alt: "woman crossing arms" },
    SUCCESS: { symbol: "🥳", alt: "party face" },
    LOADING: { symbol: "🥱", alt: "yawning face" },
  };

  let chosen;
  switch (alertType) {
    case "GENERAL":
      chosen = icons.GENERAL;
      break;
    case "WARNING":
      chosen = icons.WARNING;
      break;
    case "ERROR":
      chosen = icons.ERROR;
      break;
    case "SUCCESS":
      chosen = icons.SUCCESS;
      break;
    case "LOADING":
      chosen = icons.LOADING;
      break;

    default:
      chosen = icons.GENERAL;
  }

  return (
    <div className={className}>
      <span role="img" aria-label={chosen.alt}>
        {chosen.symbol}
      </span>
    </div>
  );
};

export default AlertIcon;
