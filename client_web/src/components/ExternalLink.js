import { openInNewTab } from "utils/openInNewTab";
import { prependHttp } from "utils/prependHttp";

export const handleExternalLinkClick = (e, to) => {
  e.stopPropagation();
  openInNewTab(prependHttp(to));
};

export const ExternalLink = ({ to, title, className, children, ...rest }) => (
  <button
    onClick={(e) => handleExternalLinkClick(e, to)}
    className={
      className
        ? className
        : "text-purple-800 hover:underline cursor-pointer text-left leading-tight"
    }
    {...rest}
  >
    {title ? title : children}
  </button>
);
