import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/messages';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGES.getVisitDate);
    return input;
  },

  async readOrders() {
    const input = await Console.readLineAsync(MESSAGES.getOrders);
    return input;
  },
};

export default InputView;
