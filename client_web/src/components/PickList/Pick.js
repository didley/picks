import { useState, useEffect } from "react";
import { ExternalLink, handleExternalLinkClick } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";
import NsfwHidden from "./NsfwHidden";

const Pick = ({ pick, allNsfwVisible }) => {
  let { url, nsfw, preview, userTitle, comments } = pick;
  const [nsfwVisible, setNsfwVisible] = useState(
    !allNsfwVisible ? false : true
  );
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    allNsfwVisible ? setNsfwVisible(true) : setNsfwVisible(false);
  }, [allNsfwVisible]);

  const domain = parseDomain(pick.url);

  const handleShowNsfw = (e) => {
    setNsfwVisible(true);
    e.stopPropagation();
  };

  const handleHideNsfw = (e) => {
    setNsfwVisible(false);
    e.stopPropagation(e);
  };

  if (nsfw && !nsfwVisible) return <NsfwHidden onClick={handleShowNsfw} />;

  return (
    <div className="grid my-1 border-l-2 border-purple-400 px-2">
      <div className="flex items-center">
        {preview?.ogImageUrl && !imgErr && (
          <img
            onClick={(e) => handleExternalLinkClick(e, url)}
            src={preview.ogImageUrl}
            alt="pick"
            onError={() => setImgErr(true)}
            className="w-24 h-24 object-cover rounded-sm mr-2 hover:opacity-50 cursor-pointer"
          />
        )}
        <div className="grid w-full">
          <p className="pb-1">
            <ExternalLink to={url}>
              {preview?.ogTitle ? preview.ogTitle : userTitle}
            </ExternalLink>
          </p>
          {preview?.ogDescription && (
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
              {preview.ogDescription}
            </p>
          )}
          <div className="flex justify-between items-center">
            {domain && <small className="text-gray-500">{domain}</small>}
            {nsfw && (
              <button
                className="text-red-500 text-sm hover:underline font-bold"
                onClick={handleHideNsfw}
              >
                Hide NSFW
              </button>
            )}
          </div>
        </div>
      </div>
      {comments && (
        <p className="text-gray-700 text-xs leading-relaxed break-words border-t mt-1">
          <span className="text-purple-400">comment:</span> {comments}
        </p>
      )}
    </div>
  );
};

export default Pick;
