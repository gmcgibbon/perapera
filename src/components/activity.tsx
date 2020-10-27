import { Box, Button, Heading } from "grommet";
import React, { Component } from "react";
import { Activity, Choice, Task } from "../db/types";

type Props = {
  activity: Activity;
};

type State = {
  tasks: Task[];
  index: number;
}

class ActivityComponent extends Component<Props, State> {
  readonly state = {
    tasks: this.props.activity.generator(),
    index: 0, 
  };

  get task() {
    const  { index, tasks } = this.state;
    return tasks[index];
  }

  checkAnswer(choice: Choice) {
    const index = this.state.index + 1;

    if (choice.text != this.task.answer) {
      const tasks = this.state.tasks.concat(this.task);
      this.setState({ index, tasks });
    } else {
      const tasks = this.state.tasks;
      this.setState({ index, tasks });
    }
  }

  render() {
    const {task, checkAnswer} = this;

    if (task) {
      return (
        <Box>
          <Heading textAlign="center">{task.symbol}</Heading>
          {task.choices.map<JSX.Element>((choice, index) => {
              return (
                <Box key={index} margin="small">
                  <Button onClick={checkAnswer.bind(this, choice)}
                          primary size="medium"
                          label={choice.text} />
                </Box>
              );
          })}
        </Box>
      )
    } else {
      return (
        <Heading textAlign="center">Well done!</Heading>
      )
    }
  }
}

export default ActivityComponent;
