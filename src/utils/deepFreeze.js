const deepFreeze = (object) => {
  Object.keys(object).forEach((propName) => {
    if (
      typeof object[propName] === 'object' &&
      !Object.isFrozen(object[prop])
    ) {
      deepFreeze(object[prop]);
    }
  });

  return Object.freeze(object);
};

export default deepFreeze;
