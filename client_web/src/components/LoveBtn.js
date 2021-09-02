export const LoveBtn = ({ likes }) => {
  return (
    <button className="inline-block align-middle">
      <small className="text-red-400">♥︎</small> <small>{likes?.length} </small>
    </button>
  );
};
