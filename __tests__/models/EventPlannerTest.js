import EventPlanner from '../../src/models/EventPlanner';

describe('EventPlanner 기능 테스트', () => {
  test.each([32, 3.1])('validate - 정상 작동', async (input) => {
    expect(() => new EventPlanner(input)).toThrow('[ERROR]');
  });
});
