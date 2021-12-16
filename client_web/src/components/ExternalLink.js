import { openInNewTab } from "utils/openInNewTab";
import { prependHttp } from "utils/prependHttp";

export const ExternalLink = ({ to, title, children, ...rest }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      openInNewTab(prependHttp(to));
    }}
    className="text-purple-800 hover:underline cursor-pointer text-left leading-tight"
    {...rest}
  >
    {title ? title : children}
  </button>
);
