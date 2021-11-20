export const normaliseArray = (arr) =>
  arr.reduce((map, obj) => {
    map[obj._id] = obj;
    return map;
  }, {});

export const denormalise = (normalizedObject) =>
  Object.values(normalizedObject);
