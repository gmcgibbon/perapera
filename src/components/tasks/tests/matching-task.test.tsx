import React from 'react';
import { render } from '../../../tests/react-helpers';
import { matchingTaskFactory } from '../../../db/tests/factories';
import { click, textOf } from '../../../tests/react-helpers';
import { Button, Heading } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { ReactTestRenderer } from 'react-test-renderer';
import { MatchingTask } from '../../../db/types';
import MatchingTaskComponent from '../matching-task';
import { sample } from 'lodash';

const fakeTask = matchingTaskFactory.create();

const nextTask = jest.fn();

class TestPage {
  constructor(private page: ReactTestRenderer) { }

  get title() {
    return this.page.root.findAllByType(Heading)[0];
  }

  get choices() {
    return this.page.root.findAllByType(Button).filter((button) => button != this.next)
  }

  get next() {
    return this.page.root.findAllByType(Button).find((button) => button.props["label"] == "Next");
  }

  get icon() {
    return this.page.root.findAllByType(Checkmark)[0];
  }

  findChoiceButton(text: string) {
    return this.choices.find((choiceElement) => textOf(choiceElement) == text);
  }
}

function randomAnswerKey(task: MatchingTask) {
  return sample(Array.from(task.answers.keys()))
}

function randomAnswerValue(task: MatchingTask) {
  return sample(Array.from(task.answers.keys()))
}

function incorrectChoiceFor(task: MatchingTask, answerKey: string) {
  let answerValue = randomAnswerValue(task);

  if (task.answers.get(answerKey) == answerValue) {
    answerValue = incorrectChoiceFor(task, answerKey);
  }

  return answerValue;
}

describe('MatchingTaskComponent', () => {
  it('renders ttile', () => {
    const taskPage = new TestPage(render(<MatchingTaskComponent nextTask={nextTask} task={fakeTask} />));
    
    expect(textOf(taskPage.title)).toBe('Match');
  });

  it('renders choices', () => {
    const taskPage = new TestPage(render(<MatchingTaskComponent nextTask={nextTask} task={fakeTask} />));
    
    fakeTask.answers.forEach((keyText, valueText) => {
      expect(taskPage.choices.some((choiceElement) => textOf(choiceElement) == keyText)).toBe(true);
      expect(taskPage.choices.some((choiceElement) => textOf(choiceElement) == valueText)).toBe(true);
    });
  });

  it('calls nextTask when correct', () => {
    const taskPage = new TestPage(render(<MatchingTaskComponent nextTask={nextTask} task={fakeTask} />));
    
    fakeTask.answers.forEach((keyText, valueText) => {
      click(taskPage.findChoiceButton(keyText));
      click(taskPage.findChoiceButton(valueText));
    });

    click(taskPage.next);

    expect(nextTask).toBeCalledWith(true);
  });

  it('does not call nextTask when incorrect', () => {
    const taskPage = new TestPage(render(<MatchingTaskComponent nextTask={nextTask} task={fakeTask} />));
    
    const answerKey = randomAnswerKey(fakeTask);
    const answerValue = incorrectChoiceFor(fakeTask, answerKey);
    
    click(taskPage.findChoiceButton(answerKey));
    click(taskPage.findChoiceButton(answerValue));

    expect(nextTask).not.toBeCalled();
  });

  it('does not render incorrect icon and next button when answer is incorrect', () => {
    const taskPage = new TestPage(render(<MatchingTaskComponent nextTask={nextTask} task={fakeTask} />));
    
    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();

    const answerKey = randomAnswerKey(fakeTask);
    const answerValue = incorrectChoiceFor(fakeTask, answerKey);

    click(taskPage.findChoiceButton(answerKey));
    click(taskPage.findChoiceButton(answerValue));

    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();
  });

  it('renders correct icon and next button when all answered', () => {
    const taskPage = new TestPage(render(<MatchingTaskComponent nextTask={nextTask} task={fakeTask} />));
    
    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();

    fakeTask.answers.forEach((keyText, valueText) => {
      click(taskPage.findChoiceButton(keyText));
      click(taskPage.findChoiceButton(valueText));
    });

    expect(taskPage.icon.type).toBe(Checkmark);
    expect(taskPage.next).toBeDefined();
  });
});
