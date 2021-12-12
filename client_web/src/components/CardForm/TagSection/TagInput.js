const TagInput = ({ inputHandlers, tagLimitReached }) => {
  return (
    <input
      {...inputHandlers}
      autoFocus
      id="tags"
      name="tags"
      placeholder="Enter tags"
      className="w-32 mr-2"
      hidden={tagLimitReached}
    />
  );
};

export default TagInput;
