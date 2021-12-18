import { useState } from "react";
import TagInput from "./TagInput";
import TagList from "./TagList";
import { useTags } from "./useTags";

const TagSection = ({
  tagsState = [],
  tagsSetter,
  opts,
  disableHiding = false,
  disableAutoFocus = false,
}) => {
  const [showTagsField, setShowTagsField] = useState(
    tagsState.length ? true : false
  );
  const { inputHandlers, removeTag, tagLimitReached } = useTags(
    tagsState,
    tagsSetter,
    opts
  );

  if (!disableHiding && !showTagsField)
    return (
      <button
        onClick={() => setShowTagsField(true)}
        className="text-left text-green-400"
        type="button"
      >
        + Add Tags
      </button>
    );

  return (
    <div className="m-1">
      <label htmlFor="tags" className="mb-1">
        Tags
      </label>
      <TagList tags={tagsState} removeTagHandler={removeTag} />
      <TagInput
        inputHandlers={inputHandlers}
        tagLimitReached={tagLimitReached}
        disableAutoFocus={disableAutoFocus}
      />
    </div>
  );
};

export default TagSection;
