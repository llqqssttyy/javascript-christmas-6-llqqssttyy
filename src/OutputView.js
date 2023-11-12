import { Console } from '@woowacourse/mission-utils';
import MESSAGES from './constants/messages';

const OutputView = {
  printStart() {
    Console.print(MESSAGES.sayHi);
  },

  printMenu() {
    Console.print('<주문 메뉴>');
  },
};

export default OutputView;
