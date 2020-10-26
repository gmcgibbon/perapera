import React from 'react';
import { render } from '../../tests/react-helpers';
import { lessonDb } from '../../db';
import { lessonFactory } from '../../db/tests/factories';
import { Lesson } from '../../db/types';
import App from '../app';
import LessonPage from '../pages/lesson';
import LessonsPage from '../pages/lessons';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

jest.mock('../../db');
const mockLessonDb = lessonDb as {
  find: jest.Mock;
  where: jest.Mock;
};

const fakeLessons = lessonFactory.createList(3);
const fakeLesson = lessonFactory.create();

describe('App', () => {
  beforeEach(() => mockLessonDb.where.mockReturnValue(fakeLessons));
  beforeEach(() => mockLessonDb.find.mockReturnValue(fakeLesson));

  it('renders in browser', () => {
    expect(() => create(<BrowserRouter><App /></BrowserRouter>)).not.toThrowError();
  });

  it('route / redirects to /lessons', () => {
    const app = render(<App />, { location: '/' });
    
    app.root.findByType(LessonsPage);
  });

  it('route /lessons', () => {
    const app = render(<App />, { location: '/lessons' });
    const page = app.root.findByType(LessonsPage);
    const lessons = page.props["lessons"] as Lesson[];
    
    expect(lessons).toStrictEqual(fakeLessons);
  });

  it('route /lessons/:id', () => {
    const app = render(<App />, { location: '/lessons/id-1' });
    const page = app.root.findByType(LessonPage);
    const lesson = page.props["lesson"] as Lesson;
    
    expect(lesson).toStrictEqual(fakeLesson);
  });
});
