import { openInNewTab } from "utils/openInNewTab";

const linkStyle = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  textDecoration: "underline",
  display: "inline",
  margin: 0,
  padding: 0,
  color: "blue",
  textAlign: "left",
};

export const ExternalLink = ({ to, title, children }) => (
  <button onClick={() => openInNewTab(to)} style={linkStyle}>
    {title ? title : children}
  </button>
);
