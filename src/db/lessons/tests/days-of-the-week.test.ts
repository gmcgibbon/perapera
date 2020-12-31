import { Task, TaskType } from '../../types';
import daysOfTheWeek from '../days-of-the-week';

describe('daysOfTheWeek', () => {
  it('id', () => {
    expect(daysOfTheWeek.id).toEqual('days-of-the-week');
  });
  
  it('title', () => {
    expect(daysOfTheWeek.title).toEqual('Days of the week');
  });

  describe('activity', () => {
    const {activity} = daysOfTheWeek;

    describe('generator', () => {
      const {generator} = activity;

      it('returns 9 tasks', () => {
        const tasks = generator();
        
        expect(tasks).toHaveLength(9);
      });

      it('returns three identify symbol tasks', () => {
        const tasks = generator();
        const identifySymbolTasks = tasks.filter(
          (task): task is Task => task.type == TaskType.IdentifySymbol
        );

        expect(identifySymbolTasks).toHaveLength(3);
      });

      it('returns three matching tasks', () => {
        const tasks = generator();
        const matchingTasks = tasks.filter(
          (task): task is Task => task.type == TaskType.Matching
        );

        expect(matchingTasks).toHaveLength(3);
      });

      it('returns three translate tasks', () => {
        const tasks = generator();
        const translateTasks = tasks.filter(
          (task): task is Task => task.type == TaskType.Translate
        );

        expect(translateTasks).toHaveLength(3);
      });

      it('returns random tasks', () => {
        const taskBatch = generator();
        const nextTaskBatch = generator();

        expect(taskBatch).toHaveLength(nextTaskBatch.length);
        expect(taskBatch).not.toStrictEqual(nextTaskBatch);
      });
    });
  });
});
