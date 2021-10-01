import React from "react";
import { ExternalLink } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";

const Pick = ({ pick }) => {
  const { url, nsfw, preview, userTitle } = pick;

  const domain = parseDomain(pick.url);

  return (
    <div className="grid my-2 border-l-2 border-red-400 px-2">
      <div>
        <div className="flex items-center gap-3">
          {preview?.ogImageUrl && (
            <img src={preview.ogImageUrl} alt="pick" className="w-20" />
          )}
          <div className="inline-block align-middle">
            <p>
              {nsfw && <span className="text-red-500 font-bold">NSFW </span>}
              <ExternalLink to={url}>
                {preview?.ogTitle ? preview.ogTitle : userTitle}
              </ExternalLink>
            </p>
            {preview?.ogDescription && (
              <small className="text-gray-500">{preview.ogDescription}</small>
            )}
            {domain && (
              <div>
                <small className="text-gray-500">{domain}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pick;
