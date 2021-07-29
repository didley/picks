export const normaliseArray = (arr) =>
  arr.reduce((map, obj) => {
    map[obj._id] = obj;
    return map;
  }, {});
