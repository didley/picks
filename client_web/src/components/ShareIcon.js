import shareIcon from "assets/share-icon.svg";

const ShareIcon = ({ className = "w-5" }) => (
  <img src={shareIcon} alt="share icon" className={className} />
);

export default ShareIcon;
