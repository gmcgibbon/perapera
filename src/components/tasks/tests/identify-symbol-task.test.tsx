import React from 'react';
import { render } from '../../../tests/react-helpers';
import { identifySymbolTaskFactory } from '../../../db/tests/factories';
import { click, textOf } from '../../../tests/react-helpers';
import { Button, Heading } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { ReactTestRenderer } from 'react-test-renderer';
import { IdentifySymbolTask } from '../../../db/types';
import IdentifySymbolTaskComponent from '../identity-symbol-task';

const fakeTask = identifySymbolTaskFactory.create();

const nextTask = jest.fn();

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

  correctChoiceFor(task: IdentifySymbolTask) {
    return this.choices.find((choiceElement) => textOf(choiceElement) == task.answer);
  }

  incorrectChoiceFor(task: IdentifySymbolTask) {
    return this.choices.find((choiceElement) => textOf(choiceElement) != task.answer);
  }
}

describe('IdentifySymbolTaskComponent', () => {
  it('renders symbol', () => {
    const taskPage = new TestPage(render(<IdentifySymbolTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    expect(textOf(taskPage.symbol)).toBe(fakeTask.symbol);
  });

  it('renders choices', () => {
    const taskPage = new TestPage(render(<IdentifySymbolTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    fakeTask.choices.forEach(({text}) => {
      expect(taskPage.choices.some((choiceElement) => textOf(choiceElement) == text)).toBe(true);
    });
  });

  it('calls nextTask when correct', () => {
    const taskPage = new TestPage(render(<IdentifySymbolTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    click(taskPage.correctChoiceFor(fakeTask));
    click(taskPage.next);

    expect(nextTask).toBeCalledWith(true);
  });

  it('calls nextTask when incorrect', () => {
    const taskPage = new TestPage(render(<IdentifySymbolTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    click(taskPage.incorrectChoiceFor(fakeTask));
    click(taskPage.next);

    expect(nextTask).toBeCalledWith(false);
  });

  it('renders incorrect icon and next button when answer is incorrect', () => {
    const taskPage = new TestPage(render(<IdentifySymbolTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();

    click(taskPage.incorrectChoiceFor(fakeTask));

    expect(taskPage.icon.type).toBe(Close);
    expect(taskPage.next).toBeDefined();
  });

  it('renders correct icon and next button when answer is correct', () => {
    const taskPage = new TestPage(render(<IdentifySymbolTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();

    click(taskPage.correctChoiceFor(fakeTask));

    expect(taskPage.icon.type).toBe(Checkmark);
    expect(taskPage.next).toBeDefined();
  });
});
