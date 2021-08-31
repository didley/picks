import React from "react";
import Preview from "./Preview";

const Pick = ({ pick, removePick, handleUrlChange }) => {
  const loadingPreview = pick.status === "loading";

  const previewNotFound = pick.status === "notFound";
  const notFoundForm = (
    <div>
      <div className="text-center bg-gray-100 border border-gray-300 rounded-xl p-1">
        <p className="text-gray-500 font-bold">No preview found</p>
        <p className="text-gray-500">Enter a title</p>
      </div>
      <label>
        Title <input className="w-full" />
      </label>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-300 rounded-md p-4 my-2">
      <div>
        <label>
          Pick URL
          <input
            onChange={(e) => handleUrlChange(e.target.value, pick._id)}
            placeholder="Past your Pick URL here"
            type="url"
            className="w-full"
          />
        </label>
      </div>
      <div>
        {loadingPreview && <p>Loading preview...</p>}
        {pick.error && <small className="text-red-500">{pick.error}</small>}
        {pick.preview && <Preview preview={pick.preview} url={pick.url} />}
        {previewNotFound && notFoundForm}
      </div>

      <div className="flex justify-between">
        <label className="font-normal">
          NSFW <input type="checkbox" />
        </label>
        <div>
          <button aria-label="move-up" type="button" className="mx-2">
            ↑
          </button>

          <button aria-label="move-down" type="button" className="mx-2">
            ↓
          </button>

          <button
            type="button"
            onClick={() => removePick(pick._id)}
            className="mx-2 text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pick;
