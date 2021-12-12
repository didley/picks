import React from "react";
import { ExternalLink } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";

const Pick = ({ pick }) => {
  const { url, nsfw, preview, userTitle, comments } = pick;

  const domain = parseDomain(pick.url);

  return (
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
              {nsfw && <span className="text-red-500 font-bold">NSFW </span>}
              {preview?.ogTitle ? preview.ogTitle : userTitle}
            </ExternalLink>
          </p>
          {preview?.ogDescription && (
            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
              {preview.ogDescription}
            </p>
          )}
          {domain && (
            <div>
              <small className="text-gray-500">{domain}</small>
            </div>
          )}
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
