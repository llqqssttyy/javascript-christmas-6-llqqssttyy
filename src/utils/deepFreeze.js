const deepFreeze = (object) => {
  Object.keys(object).forEach((prop) => {
    if (typeof object[prop] === 'object' && !Object.isFrozen(object[prop])) {
      deepFreeze(object[prop]);
    }
  });

  return Object.freeze(object);
};

export default deepFreeze;
