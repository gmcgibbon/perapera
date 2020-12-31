import React from 'react';
import { click, render } from '../../tests/react-helpers';
import { activityFactory, identifySymbolTaskFactory } from '../../db/tests/factories';
import { textOf } from '../../tests/react-helpers';
import Activity from '../activity';
import { Button, Heading } from 'grommet';
import { ReactTestRenderer } from 'react-test-renderer';
import IdentifySymbolTaskComponent from '../tasks/identity-symbol-task';
import { times } from 'lodash';

const fakeTasks = identifySymbolTaskFactory.createList(9);

const fakeActivity = activityFactory.create({
  generator: () => fakeTasks
});

class TestPage {
  constructor(private page: ReactTestRenderer) { }

  get task() {
    return this.page.root.findByType(IdentifySymbolTaskComponent);
  }

  get score() {
    return this.page.root.findAllByType(Heading)[0];
  }

  get message() {
    return this.page.root.findAllByType(Heading)[1];
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

  it('renders end screen with 80-100% correct', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    
    fakeTasks.forEach((_task) => {  
      activity.task.props["nextTask"](true);
    });

    expect(textOf(activity.score)).toBe("100%");
    expect(textOf(activity.message)).toBe("Well done!");
    expect(activity.finish).toBeDefined();
  });

  it('renders end screen with 70-89% correct', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));
    
    times(Math.ceil(fakeTasks.length * 0.20), () => {
      activity.task.props["nextTask"](false);
    });

    fakeTasks.forEach((_task) => {  
      activity.task.props["nextTask"](true);
    });

    expect(textOf(activity.score)).toBe("82%");
    expect(textOf(activity.message)).toBe("Good work!");
    expect(activity.finish).toBeDefined();
  });

  it('renders end screen with <70% correct', () => {
    const activity = new TestPage(render(<Activity activity={fakeActivity} />));

    times(Math.ceil(fakeTasks.length * 0.50), () => {
      activity.task.props["nextTask"](false);
    });
    
    fakeTasks.forEach((_task) => {  
      activity.task.props["nextTask"](true);
    });

    expect(textOf(activity.score)).toBe("64%");
    expect(textOf(activity.message)).toBe("Keep trying!");
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
