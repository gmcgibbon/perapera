import { times } from "lodash";
import { Activity, IdentifySymbolTask, Lesson, MatchingTask, TaskType } from "../types";

function createCounter(count = 0): () => number {
  return () => count += 1
};

function factory<TSomething>(definition: (id: number) => TSomething) {
  const count = createCounter();

  const create = function(attributes: Partial<TSomething> = {}): TSomething {
    const id = count();
    return { ...definition(id), ...attributes };
  }

  const createList = function(count: number, attributes: Partial<TSomething> = {}): TSomething[] {
    return times(count, () => create(attributes));
  }

  return { create, createList };
}

const identifySymbolTaskFactory = factory<IdentifySymbolTask>(() => ({
  symbol: '模擬',
  choices: [
    { text: 'Fake' },
    { text: 'Real' },
  ],
  answer: 'Fake',
  type: TaskType.IdentifySymbol,
}));

const matchingTaskFactory = factory<MatchingTask>(() => ({
  answers: new Map([
    ['Hand', '手'],
    ['Eye', '目'],
    ['Ear', '耳'],
    ['Mouth', '口'],
    ['Nose', '鼻'],
  ]),
  choices: new Map([
    [{text: 'Mouth'}, {text: '鼻'}],
    [{text: 'Eye'}, {text: '耳'}],
    [{text: 'Hand'}, {text: '口'}],
    [{text: 'Nose'}, {text: '目'}],
    [{text: 'Ear'}, {text: '手'}],
  ]),
  type: TaskType.Matching,
}));

const activityFactory = factory<Activity>(() => ({
  generator: () => {
    return [
      identifySymbolTaskFactory.create(),
      matchingTaskFactory.create(),
    ]
  },
}));

const lessonFactory = factory<Lesson>((id) => ({
  id: `id-${id}`,
  title: 'Fake Lesson',
  activity: activityFactory.create(),
}));

export {
  identifySymbolTaskFactory,
  matchingTaskFactory,
  activityFactory,
  lessonFactory,
};
