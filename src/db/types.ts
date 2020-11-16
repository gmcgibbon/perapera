export type Lesson = {
  id: string;
  title: string;
  activity: Activity;
};

export type Activity = {
  generator: () => Task[];
}

export type Choice = {
  text: string;
};

export enum TaskType {
  IdentifySymbol,
  Matching,
}

export type IdentifySymbolTask = {
  type: TaskType.IdentifySymbol;
  symbol: string;
  choices: Choice[];
  answer: string;
};

export type MatchingTask = {
  type: TaskType.Matching;
  choices: [Choice, Choice][];
};

export type Task = IdentifySymbolTask | MatchingTask;
