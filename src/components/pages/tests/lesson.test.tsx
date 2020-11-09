import React from 'react';
import { render, textOf } from '../../../tests/react-helpers';
import { lessonFactory } from '../../../db/tests/factories';
import LessonPage from '../lesson';
import Activity from '../../activity';

const fakeLesson = lessonFactory.create({});

describe('LessonPage', () => {
  it('updates page title', () => {
    render(<LessonPage lesson={fakeLesson} />, { act: true });

    expect(document.title).toBe(fakeLesson.title);
  });

  it('renders activity', () => {
    const lessonPage = render(<LessonPage lesson={fakeLesson} />);
    const activity = lessonPage.root.findByType(Activity);

    expect(activity.props["activity"]).toBe(fakeLesson.activity);
  });
});
