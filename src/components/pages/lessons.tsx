import React  from "react";
import { Link } from "react-router-dom";
import { Lesson } from "../../db/types";

type Props = {
  lessons: Lesson[];
};

function LessonsPage(props: Props): JSX.Element {
  const {lessons} = props;

  return (
    <>
      <h1>Lessons</h1>
      {lessons.map<JSX.Element>(({id, title}) => {
        return (
          <Link key={id} to={`/lessons/${id}`}>
            <h2>{title}</h2>
          </Link>
        );
      })}
    </>
  )
}

export default LessonsPage;
