import {sample, shuffle, times, zip} from "lodash";
import {Choice, IdentifySymbolTask, Lesson, MatchingTask, TranslateTask, TaskType} from "../types";

const numberKanji = new Map([
  ['一', ['One']],
  ['二', ['Two']],
  ['三', ['Three']],
  ['四', ['Four']],
  ['五', ['Five']],
  ['六', ['Six']],
  ['七', ['Seven']],
  ['八', ['Eight']],
  ['九', ['Nine']],
  ['十', ['Ten']],
  ['百', ['Hundred']],
  ['千', ['Thousand']],
  ['万', ['Ten Thousand']],
]);

const directionKanji = new Map([
  ['北', ['North']],
  ['東', ['East']],
  ['西', ['West']],
  ['南', ['South']],
  ['左', ['Left']],
  ['右', ['Right']],
  ['上', ['Above']],
  ['下', ['Below']],
  ['中', ['Inside', 'Middle']],
  ['後', ['Behind', 'After']],
]);

const adjectiveKanji = new Map([
  ['古', ['Old']],
  ['高', ['High']],
  ['安', ['Cheap']],
  ['大', ['Big']],
  ['小', ['Small']],
  ['多', ['Many']],
  ['新', ['New']],
  ['少', ['Few']],
  ['長', ['Long']],
  ['白', ['White']],
]);

const verbKanji = new Map([
  ['行', ['Go']],
  ['見', ['See']],
  ['言', ['Say']],
  ['食', ['Eat']],
  ['飲', ['Drink']],
  ['会', ['Meet']],
  ['学', ['Study', 'Learn']],
  ['休', ['Rest']],
  ['買', ['Buy']],
  ['聞', ['Hear', 'Ask', 'Listen']],
  ['来', ['Come']],
  ['話', ['Talk']],
  ['出', ['Leave']],
  ['読', ['Read']],
  ['入', ['Enter']],
  ['書', ['Write']],
])

const timeKanji = new Map([
  ['日', ['Day', 'Sun']],
  ['月', ['Month', 'Moon']],
  ['午', ['Noon']],
  ['半', ['Half']],
  ['分', ['Part']],
  ['時', ['Time']],
  ['間', ['Interval']],
  ['週', ['Week']],
  ['年', ['Year']],
  ['今', ['Now']],
  ['前', ['Before']],
  ['毎', ['Each']],
])

const personKanji = new Map([
  ['目', ['Eye']],
  ['口', ['Mouth']],
  ['耳', ['Ear']],
  ['手', ['Hand']],
  ['足', ['Foot']],
  ['人', ['Person']],
  ['母', ['Mother']],
  ['父', ['Father']],
  ['女', ['Woman']],
  ['男', ['Man']],
  ['子', ['Child']],
  ['私', ['I', 'Me']],
]);

const nounKanji = new Map([
  ['水', ['Water']],
  ['火', ['Fire']],
  ['木', ['Tree']],
  ['天', ['Sky']],
  ['土', ['Earth']],
  ['花', ['Flower']],
  ['魚', ['Fish']],
  ['犬', ['Dog']],
  ['猫', ['Cat']],
  ['空', ['Sky', 'Air']],
  ['山', ['Mountain']],
  ['川', ['River']],
  ['雨', ['Rain']],
  ['本', ['Book']],
  ['何', ['What']],
  ['立', ['Stand']],
  ['生', ['Life']],
  ['店', ['Shop']],
  ['外', ['Outside']],
  ['電', ['Electricity']],
  ['道', ['Road']],
  ['友', ['Friend']],
  ['名', ['Name']],
  ['金', ['Gold']],
  ['円', ['Circle', 'Yen']],
  ['車', ['Car']],
  ['駅', ['Station']],
  ['気', ['Spirit', 'Mind']],
  ['国', ['Country']],
  ['社', ['Company', 'Shrine']],
  ['校', ['School']],
  ['語', ['Word']],
]);

const allKanji = [
  numberKanji,
  directionKanji,
  adjectiveKanji,
  verbKanji,
  timeKanji,
  personKanji,
  nounKanji,
];

type Translation = () => [string, string[]];

function randomNumber() {
  const twoToNine: [string, number][] = [['', 0], ['二', 2], ['三', 3], ['四', 4], ['五', 5], ['六', 6], ['七', 7], ['八', 8], ['九', 9]];
  const oneToNine: [string, number][] = [['一', 1], ...twoToNine];
  const larges: [string, number][] = [['十', 10], ['百', 100], , ['千', 1000], ['万', 10000]];
  
  return larges.reduce(([totalSymbol, totalNumber], [largeSymbol, largeNumber]) => {
    if (sample([true, false])) {
      const [symbol, number] = sample(twoToNine);
      totalSymbol = [symbol, largeSymbol, totalSymbol].join('');
      totalNumber = (number * largeNumber) + totalNumber;
    }
    return [totalSymbol, totalNumber];
  }, sample(oneToNine));
}

const translations : Translation[] = [
  () =>  [
    `I watched a movie today.`,
    [
      `きょうえいがを見ました。`,
      `今日えいがをみました。`,
      `今日えいがを見ました。`,
      `今日映画を見ました。`,
    ],
  ],
  (price: [string, number] = randomNumber()) =>  [
    `That's ${price[1]} yen.`,
    [
      `それは${price[0]}円です。`,
      `それは${price[1]}円です。`,
      `其れは${price[0]}円です。`,
      `其れは${price[1]}円です。`,
    ],
  ],
  () =>  [
    `I will buy an expensive car.`,
    [
      `高い車を買います。`,
      `たかい車を買います。`,
      `高い車をかいます。`,
      `たかい車を買います。`,
      `高いくるまをかいます。`,
      `たかいくるまを買います。`,
    ],
  ],
  () =>  [
    `The fireworks are beautiful.`,
    [
      `花火はきれいです。`,
      `はな火はきれいです。`,
      `花びはきれいです。`,
      `花びは綺麗です。`,
      `はな火は綺麗です。`,
      `花火は綺麗です。`,
    ],
  ],
  () =>  [
    `My cat's name is Coco.`,
    [
      `私の猫の名前はココです。`,
      `私のねこの名前はココです。`,
      `私の猫のなまえはココです。`,
      `わたしの猫の名前はココです。`,
      `わたしのねこの名前はココです。`,
      `わたしの猫のなまえはココです。`,
    ],
  ],
  () =>  [
    `Can you speak Japanese?`,
    [
      `日本語を話しますか。`,
      `日ほんごをはなしますか。`,
      `日本ごをはなしますか。`,
      `日本語をはなしますか。`,
      `に本ごをはなしますか。`,
      `に本語をはなしますか。`,
      `に本語を話しますか。`,
      `にほん語をはなしますか。`,
      `にほん語を話しますか。`,
      `にほんごを話しますか。`,
    ],
  ],
  () =>  [
    `What time is it now?`,
    [
      `今は何時ですか。`,
      `今はなんじですか。`,
      `今は何じですか。`,
      `今はなん時ですか。`,
      `いまは何時ですか。`,
      `いまは何じですか。`,
      `いまはなん時ですか。`,
    ],
  ],
  () =>  [
    `I've already read this book.`,
    [
      `この本をもう読みました。`,
      `この本をもうよみました。`,
      `このほんをもう読みました。`,
    ],
  ],
]

function sequentialRandomizer<TElement>(collection: Iterable<TElement>) {
  const newSequence = () => shuffle(Array.from(collection));
  let sequence = newSequence();
  
  return () => {
    if (sequence.length == 0) {
      sequence = newSequence();
    }
    return sequence.pop();
  }
}

function randomIdentifySymbolTask(): IdentifySymbolTask {
  const group = sample(allKanji);
  const symbol = sample(Array.from(group.keys()));
  const groupExpectSymbol = Array.from(group).filter(([key, _]) => key != symbol);
  const answer = sample(group.get(symbol));
  const choices = shuffle(times(3, () => {
    return { text: sample(groupExpectSymbol.pop()[1]) }
  }).concat([{ text: answer }]));
  
  const type = TaskType.IdentifySymbol;

  return { symbol, choices, answer, type };
};

function randomMatchingTask(): MatchingTask {
  const randomPair = sequentialRandomizer(sample(allKanji));
  const answers = new Map(times(5, () => {
    const [key, value] = randomPair();
    return [key, sample(value)];
  }));
  const choices = new Map(zip(
    shuffle(Array.from(answers.keys()).map((text) => ({ text } as Choice))),
    shuffle(Array.from(answers.values()).map((text) => ({ text } as Choice))),
  ));
  const type = TaskType.Matching;

  return { answers, choices, type };
}

function randomTranslateTask(): TranslateTask {
  const [text, answers] = sample(translations)();
  const type = TaskType.Translate;

  return { text, answers, type };
}

const kanji: Lesson = {
  id: "kanji",
  title: "Kanji",
  activity: {
    generator: () => shuffle([
      ...times(6).map(randomIdentifySymbolTask),
      ...times(6).map(randomMatchingTask),
      ...times(3).map(randomTranslateTask),
    ])
  },
};

export default kanji;
