import React from 'react';
import { render } from '../../tests/react-helpers';
import { activityFactory, identifySymbolTaskFactory } from '../../db/tests/factories';
import { click, textOf } from '../../tests/react-helpers';
import Activity from '../activity';
import { Button, Heading } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { ReactTestRenderer } from 'react-test-renderer';
import { Task } from '../../db/types';

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

class TestPage {
  constructor(private page: ReactTestRenderer) { }

  get symbol() {
    return this.page.root.findAllByType(Heading)[0];
  }

  get message() {
    return this.page.root.findAllByType(Heading)[0];
  }

  get choices() {
    return this.page.root.findAllByType(Button).filter((button) => button != this.next)
  }

  get next() {
    return this.page.root.findAllByType(Button).find((button) => button.props["label"] == "Next");
  }

  get icon() {
    return this.page.root.findAllByType(Checkmark).concat(this.page.root.findAllByType(Close))[0];
  }

  correctChoiceFor(task: Task) {
    return this.choices.find((choiceElement) => textOf(choiceElement) == task.answer);
  }

  incorrectChoiceFor(task: Task) {
    return this.choices.find((choiceElement) => textOf(choiceElement) != task.answer);
  }
}

describe('Activity', () => {
  it('renders symbols', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    fakeTasks.forEach((task) => {
      expect(textOf(activity.symbol)).toBe(task.symbol);

      click(activity.correctChoiceFor(task));
      click(activity.next);
    });
  });

  it('renders choices', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    fakeTasks.forEach((task) => {
      task.choices.forEach(({text}) => {
        expect(activity.choices.some((choiceElement) => textOf(choiceElement) == text)).toBe(true);
      });
      
      click(activity.correctChoiceFor(task));
      click(activity.next);
    });
  });

  it('renders success screen', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    fakeTasks.forEach((task) => {  
      click(activity.correctChoiceFor(task));
      click(activity.next);
    });

    expect(textOf(activity.message)).toBe("Well done!");
  });

  it('renders incorrect icon and next button when answer is incorrect', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    const task = fakeTasks[0];
    
    expect(activity.icon).toBeUndefined();
    expect(activity.next).toBeUndefined();

    click(activity.incorrectChoiceFor(task));

    expect(activity.icon.type).toBe(Close);
    expect(activity.next).toBeDefined();
  });

  it('renders incorrect icon and next button when answer is correct', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    const task = fakeTasks[0];
    
    expect(activity.icon).toBeUndefined();
    expect(activity.next).toBeUndefined();

    click(activity.correctChoiceFor(task));

    expect(activity.icon.type).toBe(Checkmark);
    expect(activity.next).toBeDefined();
  });
});
