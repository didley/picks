import Pick from "./Pick";

const PickList = ({ picks, allNsfwVisible }) => (
  <>
    {picks &&
      picks.map((pick) => (
        <li key={pick._id}>
          <Pick pick={pick} allNsfwVisible={allNsfwVisible} />
        </li>
      ))}
  </>
);

export default PickList;
