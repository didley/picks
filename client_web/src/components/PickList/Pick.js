import { useState } from "react";
import { ExternalLink } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";
import NsfwHidden from "./NsfwHidden";

const Pick = ({ pick }) => {
  const { url, nsfw, preview, userTitle, comments } = pick;
  const [nsfwHidden, setNsfwHidden] = useState(nsfw ? true : false);

  const domain = parseDomain(pick.url);

  const handleShowNsfw = (e) => {
    setNsfwHidden(false);
    e.stopPropagation();
  };

  const handleHideNsfw = (e) => {
    setNsfwHidden(true);
  };

  if (nsfwHidden) return <NsfwHidden onClick={handleShowNsfw} />;

  return (
    <div className="relative">
      {nsfwHidden && (
        <h5 className="backdrop-filter backdrop-blur-md font-black absolute right-1/3 bottom-1/2 flex items-center gap-2 opacity-30">
          Show NSFW
        </h5>
      )}
      <div className="grid my-1 border-l-2 border-purple-400 px-2">
        <div className="flex items-center">
          {preview?.ogImageUrl && (
            <img
              src={preview.ogImageUrl}
              alt="pick"
              className="w-24 h-24 object-cover rounded-sm mr-2"
            />
          )}
          <div className="inline-block align-middle">
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
              {domain && (
                <div>
                  <small className="text-gray-500">{domain}</small>
                </div>
              )}
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
    </div>
  );
};

export default Pick;
