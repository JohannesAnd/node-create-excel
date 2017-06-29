module.exports = (base, obj) => {
  const newObject = {};

  return Object.assign(newObject, base, obj);
};
