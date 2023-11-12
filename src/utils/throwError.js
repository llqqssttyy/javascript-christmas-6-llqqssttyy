import MESSAGES from '../constants/messages.js';

const throwError = (errMsg) => {
  throw new Error(`${MESSAGES.errors.prefix} ${errMsg}`);
};

export default throwError;
