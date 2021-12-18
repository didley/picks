import { useState, useEffect } from "react";
import { ExternalLink } from "components/ExternalLink";
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
    <div className="grid my-2">
      <div className="flex items-center">
        <div className="w-40 grid justify-center">
          <ExternalLink to={url} className="">
            {preview?.ogImageUrl && !imgErr ? (
              <img
                className="object-cover h-24 rounded-sm hover:opacity-50"
                src={preview.ogImageUrl}
                alt="pick"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="h-24 bg-purple-50 w-24 rounded-full" />
            )}
          </ExternalLink>
        </div>
        <div className="grid w-full ml-2">
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
                className="text-red-500 text-xs hover:underline font-bold"
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
