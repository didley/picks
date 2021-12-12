const TagList = ({ tags, removeTagHandler }) => {
  return (
    <ul className="inline" aria-label="tags">
      {tags &&
        tags.map((tag) => (
          <div
            className="bg-green-100 inline-flex items-center text-sm rounded mb-2 mr-2 overflow-hidden"
            key={tag}
          >
            <li
              className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1"
              aria-label={`${tag} tag`}
            >
              {tag}
            </li>
            <button
              type="button"
              className="w-6 h-8 inline-block align-middle text-gray-500 bg-green-200 focus:outline-none"
              onClick={(e) => removeTagHandler(tag)}
              aria-label={`remove ${tag} tag`}
            >
              <svg
                className="w-6 h-6 fill-current mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                />
              </svg>
            </button>
          </div>
        ))}
    </ul>
  );
};

export default TagList;
