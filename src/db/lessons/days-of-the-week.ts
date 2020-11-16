import {max, sample, shuffle, times} from "lodash";
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

function randomIdentifySymbolTask(): IdentifySymbolTask {
  const symbol = sample<string>([...hiraganaDays, ...kanjiDays]);
  const choices = englishDays.map<Choice>((day) => ({ text: day }));
  const answer = englishDays[max([hiraganaDays.indexOf(symbol), kanjiDays.indexOf(symbol)])];
  const type = TaskType.IdentifySymbol;

  return { symbol, choices, answer, type };
};

function randomMatchingTask(): MatchingTask {
  
  const choices = times(4, () => {
    const typeIndex = sample(times(3));
    const characterIndex = sample(times(5));
    const keyGenerator = () => [englishDays, hiraganaDays, kanjiDays][typeIndex][characterIndex];
    const valueGenerator = () => [
      () => sample([hiraganaDays, kanjiDays]),
      () => sample([englishDays, kanjiDays]),
      () => sample([englishDays, hiraganaDays]),
    ][typeIndex]()[characterIndex];
    return [{ text: keyGenerator() }, { text: valueGenerator() }] as [Choice, Choice];
  });
  const type = TaskType.Matching;

  return { choices, type }
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
