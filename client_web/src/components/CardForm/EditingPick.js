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
  isOnlyPick,
}) => {
  const loadingPreview = pick.status === "loading";

  const displayPreviewNotFound =
    (!pick.status && !pick.preview) || pick.status === "notFound";

  const notFoundForm = (
    <>
      <div className="text-center bg-gray-100 border border-gray-300 rounded-xl p-2">
        <p className="text-gray-500 font-bold">Preview not found</p>
        <p className="text-gray-500 text-xs">Enter a title</p>
      </div>
      <label>
        Title{" "}
        <span className="text-red-500 font-normal text-xs">(required)</span>
        <input
          className="w-full"
          name="userTitle"
          onChange={onChange}
          value={pick.userTitle}
        />
      </label>
    </>
  );

  return (
    <div className="border border-purple-300 rounded-md p-2 my-2">
      <div className="grid md:grid-rows-2 md:grid-cols-2 gap-3 md:grid-flow-col">
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

        <label>
          Comments
          <input
            onChange={onChange}
            name="comments"
            value={pick.comments}
            placeholder="Tell us about this pick"
            type="text"
            className="w-full"
          />
        </label>

        {loadingPreview && <p>Loading preview...</p>}
        {pick.error && <small className="text-red-500">{pick.error}</small>}
        {pick.preview && <Preview preview={pick.preview} url={pick.url} />}
        {displayPreviewNotFound && notFoundForm}
      </div>
      <br />
      <div className="flex justify-between pb-2">
        <label className="font-normal text-xs">
          <input
            type="checkbox"
            name="nsfw"
            onChange={onChange}
            checked={pick.nsfw}
          />
          {"  "}
          NSFW
        </label>
        {!isOnlyPick && (
          <div>
            <button
              aria-label="move-up"
              type="button"
              className={
                isFirstPick ? "mx-2 invisible" : "mx-2 text-purple-500"
              }
              onClick={onMoveUp}
            >
              Move up
            </button>

            <button
              aria-label="move-down"
              type="button"
              className={isLastPick ? "mx-2 invisible" : "mx-2 text-purple-500"}
              onClick={onMoveDown}
            >
              Move down
            </button>

            <button
              type="button"
              onClick={removePick}
              className="mx-2 text-red-500"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditingPick;
