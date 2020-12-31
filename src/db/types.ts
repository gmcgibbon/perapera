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
  Translate,
}

export type IdentifySymbolTask = {
  type: TaskType.IdentifySymbol;
  symbol: string;
  choices: Choice[];
  answer: string;
};

export type MatchingTask = {
  type: TaskType.Matching;
  answers: Map<string, string>;
  choices: Map<Choice, Choice>;
};

export type TranslateTask = {
  type: TaskType.Translate;
  text: string;
  answers: string[];
};

export type Task = IdentifySymbolTask | MatchingTask | TranslateTask;
