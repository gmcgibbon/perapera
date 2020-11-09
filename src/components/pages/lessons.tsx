import { Anchor, Card, CardBody, Heading } from "grommet";
import { Calendar, New, Icon } from "grommet-icons";
import React, { useEffect }  from "react";
import { Lesson } from "../../db/types";

type Props = {
  lessons: Lesson[];
};

const icons : Record<string, Icon> = {
  "days-of-the-week": Calendar,
};

function LessonsPage(props: Props): JSX.Element {
  const {lessons} = props;

  useEffect(() => {
    document.title = "Lessons";
  })

  return (
    <Card fill background="light-1">
      <CardBody pad="large">
        {lessons.map<JSX.Element>(({id, title}) => {
            const Icon = icons[id] || New;
            return (
              <Anchor key={id} href={`/lessons/${id}`}>
                <Heading level="2"><Icon size="medium" />{title}</Heading>
              </Anchor>  
            );
        })}
      </CardBody>
    </Card>
  )
}

export default LessonsPage;
