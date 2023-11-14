import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/messages.js';

const OutputView = {
  printStart() {
    Console.print(MESSAGES.outputs.sayHi);
  },

  printMenus(orders) {
    const { title, printMsg } = MESSAGES.outputs.menus;

    Console.print(MESSAGES.outputs.eventPreview);

    Console.print(title);
    Console.print(printMsg(orders));
  },

  printOriginalPrice(price) {
    const { title, printMsg } = MESSAGES.outputs.originalPrice;

    Console.print(title);
    Console.print(printMsg(price));
  },

  printGift(gift) {
    const { title, printMsg } = MESSAGES.outputs.gift;

    Console.print(title);
    Console.print(printMsg(gift));
  },
};

export default OutputView;
