import {max, sample, shuffle, times, zip} from "lodash";
import {Choice, IdentifySymbolTask, Lesson, MatchingTask, TranslateTask, TaskType} from "../types";

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

type Translation = (
  englishDay: string,
  hiraganaDay: string,
  kanjiDay: string
) => [string, string[]];

const translations : Translation[] = [
  (englishDay, hiraganaDay, kanjiDay) =>  [
    `Today is ${englishDay}`,
    [
      `きょうは${hiraganaDay}です。`,
      `きょうは${kanjiDay}です。`,
      `今日は${hiraganaDay}です。`,
      `今日は${kanjiDay}です。`,
    ],
  ],
  (englishDay, hiraganaDay, kanjiDay) => [
    `Tomorrow is ${englishDay}`,
    [
      `あしたは${hiraganaDay}です。`,
      `あしたは${kanjiDay}です。`,
      `明日は${hiraganaDay}です。`,
      `明日は${kanjiDay}です。`,
    ],
  ],
  (englishDay, hiraganaDay, kanjiDay) => [
    `Yesterday was ${englishDay}`,
    [
      `きのうは${hiraganaDay}です。`,
      `きのうは${kanjiDay}です。`,
      `昨日は${hiraganaDay}です。`,
      `昨日は${kanjiDay}です。`,
    ],
  ],
  (englishDay, hiraganaDay, kanjiDay) => [
    `I like ${englishDay}s`,
    [
      `${hiraganaDay}がすきです。`,
      `${kanjiDay}がすきです。`,
      `${hiraganaDay}が好きです。`,
      `${kanjiDay}が好きです。`,
    ],
  ],
  (englishDay, hiraganaDay, kanjiDay) => [
    `I don't like ${englishDay}s`,
    [
      `${hiraganaDay}がすきでわありません。`,
      `${kanjiDay}がすきでわありません。`,
      `${hiraganaDay}が好でわありません。`,
      `${kanjiDay}が好でわありません。`,
    ],
  ],
  (englishDay, hiraganaDay, kanjiDay) => [
    `I will study on ${englishDay}`,
    [
      `${hiraganaDay}にべんきょうをします。`,
      `${kanjiDay}にべんきょうをします。`,
      `${hiraganaDay}に勉強を為ます。`,
      `${kanjiDay}に勉強を為ます。`,
      `${hiraganaDay}に勉強をします。`,
      `${kanjiDay}に勉強をします。`,
      `${hiraganaDay}にべんきょうを為ます。`,
      `${kanjiDay}にべんきょうを為ます。`,
    ],
  ],
  (englishDay, hiraganaDay, kanjiDay) => [
    `I went to the office on ${englishDay}`,
    [
      `${hiraganaDay}にかいしゃにいきました。`,
      `${kanjiDay}にかいしゃにいきました。`,
      `${hiraganaDay}に会社に行きました。`,
      `${kanjiDay}に会社に行きました。`,
      `${hiraganaDay}にかいしゃに行きました。`,
      `${kanjiDay}にかいしゃに行きました。`,
      `${hiraganaDay}に会社にいきました。`,
      `${kanjiDay}に会社にいきました。`,
    ],
  ],
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

function randomTranslateTask(): TranslateTask {
  const dayIndexer = randomDayIndexer();
  const dayIndex = dayIndexer();

  const englishDay = englishDays[dayIndex];
  const hiraganaDay = hiraganaDays[dayIndex];
  const kanjiDay = kanjiDays[dayIndex];

  const [text, answers] = sample(translations)(englishDay, hiraganaDay, kanjiDay);
  const type = TaskType.Translate;

  return { text, answers, type };
}

const daysOfTheWeek: Lesson = {
  id: "days-of-the-week",
  title: "Days of the week",
  activity: {
    generator: () => shuffle([
      ...times(3).map(randomIdentifySymbolTask),
      ...times(3).map(randomMatchingTask),
      ...times(3).map(randomTranslateTask),
    ])
  },
};

export default daysOfTheWeek;
