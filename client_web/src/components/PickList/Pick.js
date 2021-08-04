import React from "react";
import { ExternalLink } from "components/ExternalLink";
import { parseDomain } from "utils/parseDomain";
import ShareIcon from "components/ShareIcon";

const Pick = ({ pick }) => {
  const { title, url, comments, nsfw, likes } = pick;

  return (
    <div className="grid my-2 border-l-2 border-red-400 px-2">
      <p>
        {nsfw && <small className="text-red-500 font-bold">NSFW </small>}
        <ExternalLink to={url}>{title}</ExternalLink>
      </p>
      <div className="flex justify-between">
        <small className="text-gray-500 inline-block align-middle">
          {parseDomain(url)}
        </small>
        <div>
          <button className="inline-block align-middle">
            <small className="text-red-400">♥︎</small>{" "}
            <small>{likes?.length} </small>
          </button>
          <button className="w-5 inline-block align-middle">
            <ShareIcon />
          </button>
        </div>
      </div>
      {comments && <small>comments: {comments}</small>}
    </div>
  );
};

export default Pick;
