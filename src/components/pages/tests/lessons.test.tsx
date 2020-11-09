import { zip } from 'lodash';
import React from 'react';
import { render } from '../../../tests/react-helpers';
import { lessonFactory } from '../../../db/tests/factories';
import { textOf } from '../../../tests/react-helpers';
import LessonsPage from '../lessons';
import { Anchor } from 'grommet';

const linkType = Anchor;
const fakeLessons = lessonFactory.createList(5);

describe('LessonPage', () => {
  it('updates page title', () => {
    render(<LessonsPage lessons={fakeLessons} />, { act: true });

    expect(document.title).toBe('Lessons');
  });

  it('renders lessons', () => {
    const lessonsPage = render(<LessonsPage lessons={fakeLessons} />);
    const lessonLinks = lessonsPage.root.findAllByType(linkType);

    zip(lessonLinks, fakeLessons).forEach(([link, lesson]) => {
      expect(textOf(link)).toBe(lesson.title);
    });
  });

  describe('lesson links', () => {
    it('links to lesson', () => {
      const lessonsPage = render(<LessonsPage lessons={fakeLessons} />);
      const lessonLinks = lessonsPage.root.findAllByType(linkType);

      zip(lessonLinks, fakeLessons).forEach(([link, lesson]) => {
        expect(link.props["href"]).toBe(`/lessons/${lesson.id}`);
      });
    });
  });
});
