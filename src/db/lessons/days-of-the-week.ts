import {max, sample, shuffle, times, zip} from "lodash";
import {Choice, IdentifySymbolTask, Lesson, MatchingTask, Task, TaskType} from "../types";

const englishDays: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const hiraganaDays: string[] = [
  "げつようび",
  "かようび",
  "すいようび",
  "もくようび",
  "きんようび",
  "どようび",
  "にちようび",
];

const kanjiDays: string[] = [
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
  "日曜日",
];

const randomDayIndexer = () => {
  const newIndices = () => shuffle(times(englishDays.length));
  let indices = newIndices();
  
  return () => {
    if (indices.length == 0) {
      indices = newIndices();
    }
    return indices.pop();
  }
}

function randomIdentifySymbolTask(): IdentifySymbolTask {
  const symbol = sample<string>([...hiraganaDays, ...kanjiDays]);
  const choices = englishDays.map<Choice>((day) => ({ text: day }));
  const answer = englishDays[max([hiraganaDays.indexOf(symbol), kanjiDays.indexOf(symbol)])];
  const type = TaskType.IdentifySymbol;

  return { symbol, choices, answer, type };
};

function randomMatchingTask(): MatchingTask {
  const dayIndexer = randomDayIndexer();
  const answers = new Map(times(5, () => {
    const randomDayIndex = dayIndexer();
    const key = englishDays[randomDayIndex];
    const value = sample([hiraganaDays, kanjiDays])[randomDayIndex];
    return [key, value];
  }));
  const choices = new Map(zip(
    shuffle(Array.from(answers.keys()).map((text) => ({ text } as Choice))),
    shuffle(Array.from(answers.values()).map((text) => ({ text } as Choice))),
  ));
  const type = TaskType.Matching;

  return { answers, choices, type };
}

const daysOfTheWeek: Lesson = {
  id: "days-of-the-week",
  title: "Days of the week",
  activity: {
    generator: () => shuffle([
      ...times(3).map(randomIdentifySymbolTask),
      ...times(3).map(randomMatchingTask),
    ])
  },
};

export default daysOfTheWeek;
