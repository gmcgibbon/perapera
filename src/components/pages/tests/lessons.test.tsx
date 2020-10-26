import { zip } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { render } from '../../../tests/react-helpers';
import { lessonFactory } from '../../../db/tests/factories';
import { textOf } from '../../../tests/react-helpers';
import LessonsPage from '../lessons';

const fakeLessons = lessonFactory.createList(5);

describe('LessonPage', () => {
  it('renders lessons', () => {
    const lessonsPage = render(<LessonsPage lessons={fakeLessons} />);
    const lessonLinks = lessonsPage.root.findAllByType(Link);

    zip(lessonLinks, fakeLessons).forEach(([link, lesson]) => {
      expect(textOf(link)).toBe(lesson.title);
    });
  });

  describe('lesson links', () => {
    it('links to lesson', () => {
      const lessonsPage = render(<LessonsPage lessons={fakeLessons} />);
      const lessonLinks = lessonsPage.root.findAllByType(Link);

      zip(lessonLinks, fakeLessons).forEach(([link, lesson]) => {
        expect(link.props["to"]).toBe(`/lessons/${lesson.id}`);
      });
    });
  });
});
