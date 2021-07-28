import Pick from "./Pick";

const PickList = ({ picks }) => (
  <ul>
    {picks &&
      picks.map((pick) => (
        <li key={pick._id}>
          <Pick pick={pick} />
        </li>
      ))}
  </ul>
);

export default PickList;
