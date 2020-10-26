import { Card } from "grommet/components/Card";
import { CardBody } from "grommet/components/CardBody";
import { CardHeader } from "grommet/components/CardHeader";
import { Heading } from "grommet/components/Heading";
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
    <Card  height="medium" width="medium" background="light-1">
      <CardHeader pad="medium">
        <Heading>{title}</Heading>
      </CardHeader>
      <CardBody pad="medium">
        <Activity activity={activity}/>
      </CardBody>
    </Card>
  );
};

export default LessonPage;
