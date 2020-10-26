import React from "react";
import { Lesson } from "../../db/types";
import Activity from "../activity";

type Props = {
  lesson: Lesson;
}

function LessonPage(props: Props): JSX.Element {
  const {lesson} = props;
  const {title, activity} = lesson;
  
  return (
    <>
      <h1>{title}</h1>
      <Activity activity={activity}/>
    </>
  );
};

export default LessonPage;
