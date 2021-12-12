import { useState } from "react";

const defaultOpts = { tagLimit: 5, minCharLimit: 3, maxCharLimit: 25 };

export const useTags = (tags, setTags, options = defaultOpts) => {
  const [inputValue, setInputValue] = useState("");
  const [tagBackspaced, setTagBackspaced] = useState(false); //! tagBackspaced: Workaround to prevent onChange triggering as onChange can not be suppressed after onKeyDown

  const { tagLimit, minCharLimit, maxCharLimit } = options;

  const tagLimitReached = tagLimit <= tags.length;

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    const alreadyTagged = tags.some(
      (existingTag) => existingTag.toLowerCase() === trimmedTag.toLowerCase()
    );
    if (alreadyTagged) return;
    if (tags.length >= tagLimit) return;
    if (minCharLimit > trimmedTag.length) return;

    if (tag) setTags([...tags, tag.trim()]);
    setInputValue("");
  };

  const removeTag = (removingTag) => {
    const updatedTags = tags.filter((tag) => tag !== removingTag);
    setTags(updatedTags);
  };

  const handleKeyDown = (e) => {
    const enter = e.keyCode === 13;
    const backspace = e.keyCode === 8;

    if (enter) {
      addTag(inputValue);
      e.preventDefault();
    }

    if (backspace && inputValue === "" && tags.length > 0) {
      const lastTag = tags.at(-1);
      removeTag(lastTag);
      setInputValue(lastTag);
      setTagBackspaced(true);
    }
  };

  const handleChange = (e) => {
    const latestChar = e.target.value.slice(-1);
    const addTagChars = [" ", ",", "."];
    const ignoredChars = ["#", "/", "-"];

    const isAddTagChar = addTagChars.some((char) => char === latestChar);
    const isIgnoredChar = ignoredChars.some((char) => char === latestChar);
    const isSpecialChar = /[^a-zA-Z0-9\-\/]/.test(latestChar);

    if (isAddTagChar && tags) {
      const tag = e.target.value.slice(0, -1);
      return addTag(tag.trim());
    }

    if (isIgnoredChar || isSpecialChar) return;
    if (maxCharLimit < e.target.value.length) return;

    if (tagBackspaced) {
      setTagBackspaced(false);
    } else {
      const strippedTag = e.target.value.replaceAll(" ", "");
      setInputValue(strippedTag);
    }
  };

  return {
    inputHandlers: {
      onKeyDown: handleKeyDown,
      onChange: handleChange,
      value: inputValue,
      minLength: minCharLimit,
    },
    removeTag,
    tagLimitReached,
  };
};
