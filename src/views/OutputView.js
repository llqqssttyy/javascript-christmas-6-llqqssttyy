import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/messages.js';

const OutputView = {
  printStart() {
    Console.print(MESSAGES.outputs.sayHi);
  },

  printMenu(orders) {
    Console.print(MESSAGES.outputs.eventPreview);
    Console.print(MESSAGES.outputs.ordersTitle);

    orders.map((order) => {
      Console.print(MESSAGES.outputs.singleMenu(order));
    });
  },
};

export default OutputView;
