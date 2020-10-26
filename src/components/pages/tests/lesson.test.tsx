import React from 'react';
import { render, textOf } from '../../../tests/react-helpers';
import { lessonFactory } from '../../../db/tests/factories';
import LessonPage from '../lesson';
import Activity from '../../activity';

const fakeLesson = lessonFactory.create({});

describe('LessonPage', () => {
  it('renders activity', () => {
    const lessonPage = render(<LessonPage lesson={fakeLesson} />);
    const title = lessonPage.root.findByType("h1");
    const activity = lessonPage.root.findByType(Activity);

    expect(textOf(title)).toBe(fakeLesson.title);
    expect(activity.props["activity"]).toBe(fakeLesson.activity);
  });
});
