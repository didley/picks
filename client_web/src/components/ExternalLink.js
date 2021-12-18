export const ExternalLink = ({
  to,
  title,
  samePage = false,
  className,
  children,
  ...rest
}) => (
  <a
    onClick={(e) => e.stopPropagation()}
    href={to}
    target={samePage ? null : "_blank"}
    rel="noopener noreferrer"
    className={
      className
        ? className
        : "text-purple-800 hover:underline cursor-pointer text-left leading-tight"
    }
    {...rest}
  >
    {title ? title : children}
  </a>
);
