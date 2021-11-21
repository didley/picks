import { openInNewTab } from "utils/openInNewTab";
import prependHttp from "prepend-http";

export const ExternalLink = ({ to, title, children }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      openInNewTab(prependHttp(to));
    }}
    className="text-purple-800 hover:underline cursor-pointer text-left leading-tight"
  >
    {title ? title : children}
  </button>
);
