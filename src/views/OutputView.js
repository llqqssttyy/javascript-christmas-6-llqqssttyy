import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/messages.js';

const OutputView = {
  printStart() {
    Console.print(MESSAGES.outputs.sayHi);
  },

  printMenus(orders) {
    Console.print(MESSAGES.outputs.eventPreview);
    Console.print(MESSAGES.outputs.ordersTitle);

    Console.print(MESSAGES.outputs.printMenus(orders));
  },
};

export default OutputView;
