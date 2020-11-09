import React from 'react';
import { render } from '../../tests/react-helpers';
import { activityFactory, identifySymbolTaskFactory } from '../../db/tests/factories';
import { click, textOf } from '../../tests/react-helpers';
import Activity from '../activity';
import { Button, Heading } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { ReactTestRenderer } from 'react-test-renderer';

const fakeTasks = [
  identifySymbolTaskFactory.create({
    symbol: '川',
    answer: 'River',
    choices: [
      { text: 'River' },
      { text: 'Ocean' },
      { text: 'Pond' },
      { text: 'Water' },
    ]
  }),
  identifySymbolTaskFactory.create({
    symbol: '山',
    answer: 'Mountain',
    choices: [
      { text: 'Mountain' },
      { text: 'Hill' },
      { text: 'Factory' },
      { text: 'City' },
    ]
  }),
  identifySymbolTaskFactory.create({
    symbol: '日',
    answer: 'Sun',
    choices: [
      { text: 'Sun' },
      { text: 'Eye' },
      { text: 'White' },
      { text: 'Mouth' },
    ]
  }),
];

const fakeActivity = activityFactory.create({
  generator: () => fakeTasks
});

const symbolType = Heading;
const choiceType = Button;
const iconType = Heading;

describe('Activity', () => {
  it('renders symbols', () => {
    const activity = render(<Activity activity={fakeActivity} />);
    fakeTasks.forEach((task) => {
      const symbolEelment = activity.root.findAllByType(symbolType)[0];
      expect(textOf(symbolEelment)).toBe(task.symbol);
      
      const choiceElements = activity.root.findAllByType(choiceType);
      const correctChoiceElement = choiceElements.find((choiceElement) => textOf(choiceElement) == task.answer);
      
      click(correctChoiceElement);
    });
  });

  it('renders choices', () => {
    const activity = render(<Activity activity={fakeActivity} />);
    fakeTasks.forEach((task) => {
      const choiceElements = activity.root.findAllByType(choiceType);
      const correctChoiceElement = choiceElements.find((choiceElement) => textOf(choiceElement) == task.answer);

      task.choices.forEach(({text}) => {
        expect(choiceElements.some((choiceElement) => textOf(choiceElement) == text)).toBe(true);
      });
      
      click(correctChoiceElement);
    });
  });

  it('renders success screen', () => {
    const activity = render(<Activity activity={fakeActivity} />);
    fakeTasks.forEach((task) => {
      const choiceElements = activity.root.findAllByType(choiceType);
      const choiceAnswerElement = choiceElements.find((choiceElement) => textOf(choiceElement) == task.answer);
  
      task.choices.forEach(({text}) => {
        expect(choiceElements.some((choiceElement) => textOf(choiceElement) == text)).toBe(true);
      });
        
      click(choiceAnswerElement);
    });
  });

  it('renders icons', () => {
    const activity = render(<Activity activity={fakeActivity} />);
    const task = fakeTasks[0];
    
    expect(iconsOnPage(activity)).toHaveLength(0);
      
    const choiceElements = activity.root.findAllByType(choiceType);
    const correctChoiceElement = choiceElements.find((choiceElement) => textOf(choiceElement) == task.answer);
    const incorrectChoiceElement = choiceElements.find((choiceElement) => correctChoiceElement != choiceElement);

    click(incorrectChoiceElement);

    expect(iconsOnPage(activity)[0].type).toBe(Close);

    click(correctChoiceElement);

    expect(iconsOnPage(activity)[0].type).toBe(Checkmark);
  });

  function iconsOnPage(page: ReactTestRenderer) {
    return page.root.findAllByType(Checkmark).concat(page.root.findAllByType(Close));
  }
});
