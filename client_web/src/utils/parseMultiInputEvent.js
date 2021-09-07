export const parseMultiInputEvent = (evt) => {
  const target = evt.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;
  return { fieldName: name, newValue: value };
};
