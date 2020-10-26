import {lessonDb} from '../';
import daysOfTheWeek from '../lessons/days-of-the-week';

describe('lessonDb', () => {
  describe('find', () => {
    const {find} = lessonDb;

    it('finds a lesson by id', () => {
      expect(find('days-of-the-week')).toStrictEqual(daysOfTheWeek);
    });
  });
  
  describe('where', () => {
    const {where} = lessonDb;

    it('finds lessons by attributes', () => {
      expect(where({id: 'days-of-the-week'})).toStrictEqual([daysOfTheWeek]);
    });
  });
});
