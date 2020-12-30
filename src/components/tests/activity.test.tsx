import React from 'react';
import { click, render } from '../../tests/react-helpers';
import { activityFactory, identifySymbolTaskFactory } from '../../db/tests/factories';
import { textOf } from '../../tests/react-helpers';
import Activity from '../activity';
import { Button, Heading } from 'grommet';
import { ReactTestRenderer } from 'react-test-renderer';
import IdentifySymbolTaskComponent from '../tasks/identity-symbol-task';

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

  get task() {
    return this.page.root.findByType(IdentifySymbolTaskComponent);
  }

  get message() {
    return this.page.root.findByType(Heading);
  }

  get finish() {
    return this.page.root.findByType(Button);
  }
}

describe('Activity', () => {
  it('renders task', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    
    expect(activity.task).toBeDefined();
  });

  it('renders each task', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    
    fakeTasks.forEach((_task) => {  
      expect(activity.task).toBeDefined();

      activity.task.props["nextTask"](true);
    });
  });

  it('renders success screen', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    
    fakeTasks.forEach((_task) => {  
      activity.task.props["nextTask"](true);
    });

    expect(textOf(activity.message)).toBe("Well done!");
    expect(activity.finish).toBeDefined();
  });

  it('ends activity on finish button click', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    
    fakeTasks.forEach((_task) => {  
      activity.task.props["nextTask"](true);
    });

    click(activity.finish);
    expect(document.location.href).toBe('http://localhost/');
  });
});
