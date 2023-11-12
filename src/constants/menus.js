import deepFreeze from '../utils/deepFreeze.js';

export const APPETIZERS = '애피타이저';
export const MAIN_COURSES = '메인';
export const DESSERTS = '디저트';
export const BEVERAGES = '음료';

export const categories = { APPETIZERS, MAIN_COURSES, DESSERTS, BEVERAGES };

export const MENUS = deepFreeze({
  애피타이저: {
    양송이수프: 6_000,
    타파스: 5_500,
    시저샐러드: 8_000,
  },
  메인: {
    티본스테이크: 55_000,
    바비큐립: 54_000,
    해산물파스타: 35_000,
    크리스마스파스타: 25_000,
  },
  디저트: {
    초코케이크: 15_000,
    아이스크림: 5_000,
  },
  음료: {
    제로콜라: 3_000,
    레드와인: 60_000,
    샴페인: 25_000,
  },
});
