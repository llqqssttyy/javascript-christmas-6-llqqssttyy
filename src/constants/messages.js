import deepFreeze from '../utils/deepFreeze.js';
import { EVENT_MONTH } from './event.js';

const MESSAGES = deepFreeze({
  // InputView
  inputs: {
    getVisitDate: `${EVENT_MONTH}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
    getOrders:
      '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  },

  // OutputView
  outputs: {
    sayHi: `안녕하세요! 우테코 식당 ${EVENT_MONTH}월 이벤트 플래너입니다.`,

    eventPreview: (date) =>
      `${EVENT_MONTH}월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,

    menus: {
      title: '<주문 메뉴>',
      printMsg: (menus) =>
        menus.reduce(
          (acc, { menu, amount }) => `${acc}${menu} ${amount}개\n`,
          '',
        ),
    },

    originalPrice: {
      title: '<할인 전 총주문 금액>',
      printMsg: (price) => `${price.toLocaleString()}원\n`,
    },

    gift: {
      title: '<증정 메뉴>',
      printMsg: (gift) => {
        if (!gift) return '없음\n';

        return `${gift.menu} ${gift.amount}개\n`;
      },
    },

    benefits: {
      title: '<혜택 내역>',
      printMsg: (benefits) => {
        if (!benefits) return '없음\n';

        return Object.entries(benefits).reduce(
          (acc, [eventName, { amount, price }]) =>
            `${acc}${eventName}: -${(amount * price).toLocaleString()}원\n`,
          '',
        );
      },
    },

    totalBenefitMoney: {
      title: '<총혜택 금액>',
      printMsg: (money) => {
        if (!money) return '0원\n';

        return `-${money.toLocaleString()}원\n`;
      },
    },

    payment: {
      title: '<할인 후 예상 결제 금액>',
      printMsg: (money) => `${money.toLocaleString()}원\n`,
    },

    badge: {
      title: '<12월 이벤트 배지>',
      printMsg: (badge) => `${badge}`,
    },
  },

  // Error
  errors: {
    prefix: '[ERROR]',
    invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    invalidOrders: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  },
});

export default MESSAGES;
