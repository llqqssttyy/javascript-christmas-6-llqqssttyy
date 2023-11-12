import { getValueOfField, shallowEqual } from '../../src/utils/object';

describe('object 유틸 함수 테스트', () => {
  test('shallowEqual 기능 테스트 - true', () => {
    const OBJECT_A = {
      key: 'value',
    };
    const OBJECT_B = {
      key: 'value',
    };
    const RESULT = true;

    expect(shallowEqual(OBJECT_A, OBJECT_B)).toBe(RESULT);
  });

  test.each([{ key: 'value-1' }, { key: 'value', key2: 'value' }])(
    'shallowEqual 기능 테스트 - false',
    (OBJECT_B) => {
      const OBJECT_A = {
        key: 'value',
      };
      const RESULT = false;

      expect(shallowEqual(OBJECT_A, OBJECT_B)).toBe(RESULT);
    },
  );

  test('getValueOfField 기능 테스트', () => {
    const OBJECT = {
      key1: {
        key2: 'value',
      },
    };
    const FIELD = 'key1.key2';
    const RESULT = 'value';

    expect(getValueOfField(OBJECT, FIELD)).toBe(RESULT);
  });
});
