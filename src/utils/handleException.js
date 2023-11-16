import { Console } from '@woowacourse/mission-utils';

const handleException = async (action) => {
  while (true) {
    try {
      await action();
      break;
    } catch (err) {
      Console.print(err.message);
    }
  }
};

export default handleException;
