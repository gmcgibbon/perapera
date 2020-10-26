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

      it('returns three tasks', () => {
        const tasks = generator();
        
        expect(tasks).toHaveLength(3);
      });

      it('returns three identify symbol tasks', () => {
        const tasks = generator();
        const identifySymbolTasks = tasks.filter((task): task is Task => task.type == TaskType.IdentifySymbol);

        expect(identifySymbolTasks).toHaveLength(3);
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
