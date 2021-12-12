import React, { useState } from "react";
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
  const [showCommentField, setShowCommentField] = useState(() =>
    pick.comments ? true : false
  );

  const handleCommentChange = (e) => {
    onChange(e);
    if (e.target.value === "") setShowCommentField(false);
  };

  const handleCommentKeyDown = (e) => {
    if (e.target.value === "") {
      const backspacePressed = e.keyCode === 8;
      const deletePressed = e.keyCode === 46;

      if (backspacePressed || deletePressed) setShowCommentField(false);
    }
  };

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
          required
          className="w-full"
          name="userTitle"
          onChange={onChange}
          value={pick.userTitle}
          placeholder="Describe what this pick is"
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
            autoFocus
            required
            onChange={onChange}
            name="url"
            value={pick.url}
            placeholder="Paste your Pick URL here"
            type="text"
            className="w-full max-w-sm"
          />
        </label>

        {showCommentField ? (
          <label>
            Pick Comment
            <input
              autoFocus
              onChange={handleCommentChange}
              onKeyDown={handleCommentKeyDown}
              name="comments"
              value={pick.comments}
              placeholder="Tell us about this pick"
              type="text"
              className="w-full"
            />
          </label>
        ) : (
          <button
            onClick={() => setShowCommentField(true)}
            className="text-left text-purple-500 my-2"
            type="button"
          >
            + Add Comment
          </button>
        )}
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
