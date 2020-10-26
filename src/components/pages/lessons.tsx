import { Card } from "grommet/components/Card";
import { CardBody } from "grommet/components/CardBody";
import { CardHeader } from "grommet/components/CardHeader";
import { Heading } from "grommet/components/Heading";
import React  from "react";
import { Link } from "react-router-dom";
import { Lesson } from "../../db/types";

type Props = {
  lessons: Lesson[];
};

function LessonsPage(props: Props): JSX.Element {
  const {lessons} = props;

  return (
    <Card  height="medium" width="medium" background="light-1">
      <CardHeader pad="medium">
        <Heading textAlign="center">Lessons</Heading>
      </CardHeader>
      <CardBody pad="medium">
        <ul>
          {lessons.map<JSX.Element>(({id, title}) => {
            return (
              <li>
                <Link key={id} to={`/lessons/${id}`}>
                  <h2>{title}</h2>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  )
}

export default LessonsPage;
