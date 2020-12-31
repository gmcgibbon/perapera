import React from 'react';
import { fillIn, render } from '../../../tests/react-helpers';
import { translateTaskFactory } from '../../../db/tests/factories';
import { click, textOf } from '../../../tests/react-helpers';
import { Button, Heading, TextArea } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { ReactTestRenderer } from 'react-test-renderer';
import TranslateTaskComponent from '../translate-task';
import { sample } from 'lodash';

const fakeTask = translateTaskFactory.create();

const nextTask = jest.fn();

class TestPage {
  constructor(private page: ReactTestRenderer) { }

  get sentence() {
    return this.page.root.findAllByType(Heading)[0];
  }

  get textArea() {
    return this.page.root.findAllByType(TextArea)[0];
  }

  get go() {
    return this.page.root.findAllByType(Button).find((button) => button.props["label"] == "Go");
  }

  get correction() {
    return this.page.root.findAllByType(Heading)[1];
  }

  get next() {
    return this.page.root.findAllByType(Button).find((button) => button.props["label"] == "Next");
  }

  get icon() {
    return this.page.root.findAllByType(Checkmark).concat(this.page.root.findAllByType(Close))[0];
  }
}

describe('TranslateTaskComponent', () => {
  it('renders sentence', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    expect(textOf(taskPage.sentence)).toBe(fakeTask.text);
  });

  it('renders text area', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));

    expect(textOf(taskPage.textArea)).toBe('');
  });

  it('does not render correction', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));

    expect(taskPage.correction).toBeUndefined();
  });

  it('renders correction when incorrect', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    const answer = 'incorrect';

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);

    expect(textOf(taskPage.correction)).toBe(fakeTask.answers[0]);
  });

  it('calls nextTask when correct', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    const answer = sample(fakeTask.answers);

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);
    click(taskPage.next);

    expect(nextTask).toBeCalledWith(true);
  });

  it('allows answer without period', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    const answer = sample(fakeTask.answers).replace('。', '');

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);
    click(taskPage.next);

    expect(nextTask).toBeCalledWith(true);
  });

  it('allows answer with extra spaces', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    const answer = sample(fakeTask.answers).replace(/(\S)/g, ' $1　');

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);
    click(taskPage.next);

    expect(nextTask).toBeCalledWith(true);
  });

  it('calls nextTask when incorrect', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    
    const answer = 'incorrect';

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);
    click(taskPage.next);

    expect(nextTask).toBeCalledWith(false);
  });

  it('renders incorrect icon and next button when answer is incorrect', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    const answer = 'incorrect';

    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);
    click(taskPage.next);

    expect(taskPage.icon.type).toBe(Close);
    expect(taskPage.next).toBeDefined();
  });

  it('renders correct icon and next button when answer is correct', () => {
    const taskPage = new TestPage(render(<TranslateTaskComponent nextTask={nextTask}  task={fakeTask} />));
    const answer = sample(fakeTask.answers)

    expect(taskPage.icon).toBeUndefined();
    expect(taskPage.next).toBeUndefined();

    fillIn(taskPage.textArea, answer);
    click(taskPage.go);
    click(taskPage.next);

    expect(taskPage.icon.type).toBe(Checkmark);
    expect(taskPage.next).toBeDefined();
  });
});
