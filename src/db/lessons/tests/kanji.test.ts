import { Task, TaskType } from '../../types';
import kanji from '../kanji';

describe('kanji', () => {
  it('id', () => {
    expect(kanji.id).toEqual('kanji');
  });
  
  it('title', () => {
    expect(kanji.title).toEqual('Kanji');
  });

  describe('activity', () => {
    const {activity} = kanji;

    describe('generator', () => {
      const {generator} = activity;

      it('returns 15 tasks', () => {
        const tasks = generator();
        
        expect(tasks).toHaveLength(15);
      });

      it('returns 6 identify symbol tasks', () => {
        const tasks = generator();
        const identifySymbolTasks = tasks.filter(
          (task): task is Task => task.type == TaskType.IdentifySymbol
        );

        expect(identifySymbolTasks).toHaveLength(6);
      });

      it('returns 6 matching tasks', () => {
        const tasks = generator();
        const matchingTasks = tasks.filter(
          (task): task is Task => task.type == TaskType.Matching
        );

        expect(matchingTasks).toHaveLength(6);
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
