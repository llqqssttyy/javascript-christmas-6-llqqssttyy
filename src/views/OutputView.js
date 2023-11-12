import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/messages.js';

const OutputView = {
  printStart() {
    Console.print(MESSAGES.outputs.sayHi);
  },

  printMenu() {
    Console.print('<주문 메뉴>');
  },
};

export default OutputView;
