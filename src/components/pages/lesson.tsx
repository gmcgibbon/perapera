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
    <Card fill background="light-1">
      <CardBody pad="large">
        <Activity activity={activity}/>
      </CardBody>
    </Card>
  );
};

export default LessonPage;
