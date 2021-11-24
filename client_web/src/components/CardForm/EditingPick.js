import React from "react";
import Preview from "./Preview";

const EditingPick = ({
  pick,
  removePick,
  onChange,
  onMoveUp,
  onMoveDown,
  isFirstPick,
  isLastPick,
}) => {
  const loadingPreview = pick.status === "loading";

  const displayPreviewNotFound =
    (!pick.status && !pick.preview) || pick.status === "notFound";

  const notFoundForm = (
    <div>
      <div className="text-center bg-gray-100 border border-gray-300 rounded-xl p-1">
        <p className="text-gray-500 font-bold">Preview not found</p>
        <p className="text-gray-500">Enter a title</p>
      </div>
      <label>
        Title
        <input
          className="w-full"
          name="userTitle"
          onChange={onChange}
          value={pick.userTitle}
        />
      </label>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-300 rounded-md p-4 my-2">
      <div>
        <label>
          Pick URL
          <input
            onChange={onChange}
            name="url"
            value={pick.url}
            placeholder="Paste your Pick URL here"
            type="text"
            className="w-full"
          />
        </label>
      </div>
      <div>
        {loadingPreview && <p>Loading preview...</p>}
        {pick.error && <small className="text-red-500">{pick.error}</small>}
        {pick.preview && <Preview preview={pick.preview} url={pick.url} />}
        {displayPreviewNotFound && notFoundForm}
      </div>

      <div className="flex justify-between">
        <label className="font-normal">
          NSFW{" "}
          <input
            type="checkbox"
            name="nsfw"
            onChange={onChange}
            checked={pick.nsfw}
          />
        </label>
        <div>
          <button
            aria-label="move-up"
            type="button"
            className={isFirstPick ? "mx-2 invisible" : "mx-2"}
            onClick={onMoveUp}
          >
            ↑
          </button>

          <button
            aria-label="move-down"
            type="button"
            className={isLastPick ? "mx-2 invisible" : "mx-2"}
            onClick={onMoveDown}
          >
            ↓
          </button>

          <button
            type="button"
            onClick={removePick}
            className="mx-2 text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditingPick;
