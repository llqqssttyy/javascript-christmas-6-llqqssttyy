import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/messages.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGES.inputs.getVisitDate);
    return input;
  },

  async readOrders() {
    const input = await Console.readLineAsync(MESSAGES.inputs.getOrders);
    return input;
  },
};

export default InputView;
