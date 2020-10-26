import {max, sample, times} from "lodash";
import {Choice, IdentifySymbolTask, Lesson, Task, TaskType} from "../types";

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

const daysOfTheWeek: Lesson = {
  id: "days-of-the-week",
  title: "Days of the week",
  activity: {
    generator: () => times(3).map<Task>(() => randomIdentifySymbolTask())
  },
};

export default daysOfTheWeek;
