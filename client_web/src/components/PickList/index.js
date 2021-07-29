import Pick from "./Pick";

const PickList = ({ picks }) => (
  <>
    {picks &&
      picks.map((pick) => (
        <li key={pick._id}>
          <Pick pick={pick} />
        </li>
      ))}
  </>
);

export default PickList;
