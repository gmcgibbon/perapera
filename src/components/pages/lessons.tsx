import { Heading } from "grommet";
import { Calendar, Icon } from "grommet-icons";
import { Card } from "grommet/components/Card";
import { CardBody } from "grommet/components/CardBody";
import React  from "react";
import { Link } from "react-router-dom";
import { Lesson } from "../../db/types";

type Props = {
  lessons: Lesson[];
};

const icons : Record<string, Icon> = {
  "days-of-the-week": Calendar,
};

function LessonsPage(props: Props): JSX.Element {
  const {lessons} = props;

  return (
    <Card fill background="light-1">
      <CardBody pad="large">
        {lessons.map<JSX.Element>(({id, title}) => {
            const Icon = icons[id];
            return (
              <Link key={id} to={`/lessons/${id}`}>
                <Heading level="2"><Icon size="medium" /> {title}</Heading>
              </Link>  
            );
        })}
      </CardBody>
    </Card>
  )
}

export default LessonsPage;
