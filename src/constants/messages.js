import deepFreeze from '../utils/deepFreeze.js';
import { EVENT_MONTH } from './events.js';

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

    eventPreview: '12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',

    menus: {
      title: '<주문 메뉴>',
      printMsg: (orders) => {
        return orders.reduce(
          (acc, { menu, amount }) => acc + `${menu} ${amount}개\n`,
          '',
        );
      },
    },

    originalPrice: {
      title: '<할인 전 총주문 금액>',
      printMsg: (price) => `${price.toLocaleString()}원\n`,
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
