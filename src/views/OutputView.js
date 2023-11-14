import { Console } from '@woowacourse/mission-utils';
import MESSAGES from '../constants/messages.js';

const OutputView = {
  printResult(msgObj, result) {
    const { title, printMsg } = msgObj;

    Console.print(title);
    Console.print(printMsg(result));
  },

  printStart() {
    Console.print(MESSAGES.outputs.sayHi);
  },

  printMenus(orders) {
    Console.print(MESSAGES.outputs.eventPreview);

    this.printResult(MESSAGES.outputs.menus, orders);
  },

  printOriginalPrice(price) {
    this.printResult(MESSAGES.outputs.originalPrice, price);
  },

  printGift(gift) {
    this.printResult(MESSAGES.outputs.gift, gift);
  },

  printBenefits(benefits) {
    this.printResult(MESSAGES.outputs.benefits, benefits);
  },

  printTotalBenefitMoney(money) {
    this.printResult(MESSAGES.outputs.totalBenefitMoney, money);
  },

  printPayment(money) {
    this.printResult(MESSAGES.outputs.payment, money);
  },

  printBadge(badge) {
    this.printResult(MESSAGES.outputs.badge, badge);
  },
};

export default OutputView;
