import React from "react";
import Preview from "./Preview";

const Pick = ({ pick, removePick, handleUrlChange }) => {
  const loadingPreview = pick.status === "loading";

  const previewNotFound = pick.status === "notFound";
  const notFoundForm = (
    <div>
      Title: <input />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-300 rounded-md p-4 my-2">
      <div className="flex justify-between">
        <p>
          URL:{" "}
          <input
            onChange={(e) => handleUrlChange(e.target.value, pick._id)}
            placeholder="Past your Pick here"
          />
        </p>
        <div className="flex justify-between">
          <label className="font-normal">NSFW[]</label>
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
      {loadingPreview && (
        <div>
          <p>Loading preview...</p>
        </div>
      )}
      {pick.preview && <Preview preview={pick.preview} />}
      {previewNotFound && notFoundForm}
    </div>
  );
};

export default Pick;
