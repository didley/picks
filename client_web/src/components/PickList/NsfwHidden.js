const NsfwHidden = ({ onClick }) => {
  return (
    <div className="border-l-2 border-purple-400 w-full h-24 grid justify-center items-center">
      <button
        onClick={onClick}
        className="border border-purple-300 hover:bg-purple-100 text-purple-400 rounded-xl py-6 px-16"
      >
        Show NSFW
      </button>
    </div>
  );
};

export default NsfwHidden;
