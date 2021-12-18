const TagInput = ({ inputHandlers, tagLimitReached, disableAutoFocus }) => {
  return (
    <input
      {...inputHandlers}
      autoFocus={!disableAutoFocus}
      id="tags"
      name="tags"
      placeholder="Enter tags"
      className="w-32 mr-2"
      hidden={tagLimitReached}
    />
  );
};

export default TagInput;
