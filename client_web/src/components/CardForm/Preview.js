import { parseDomain } from "utils/parseDomain";

const Preview = ({ preview, url, nsfw }) => {
  const { ogImageUrl, ogTitle, ogDescription } = preview;

  return (
    <div className="flex items-center gap-3">
      {ogImageUrl && <img src={ogImageUrl} alt="pick" className="w-20" />}
      <div className="inline-block align-middle">
        {ogTitle && (
          <p>
            {nsfw && <span className="text-red-500 font-bold">NSFW </span>}
            {ogTitle}
          </p>
        )}
        {ogDescription && (
          <small className="text-gray-500">{ogDescription}</small>
        )}
        {url && (
          <div>
            <small className="text-gray-500">{parseDomain(url)}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
