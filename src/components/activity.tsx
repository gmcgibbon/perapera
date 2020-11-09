import { Box, Button, Heading } from "grommet";
import { Checkmark, Close } from "grommet-icons";
import React, { Component } from "react";
import { Activity, Choice, Task } from "../db/types";

type Props = {
  activity: Activity;
};

enum Interaction {
  Correct,
  Incorrect,
  Unanswered,
}

type State = {
  tasks: Task[];
  index: number;
  answer: Interaction;
}

class ActivityComponent extends Component<Props, State> {
  readonly state = {
    tasks: this.props.activity.generator(),
    index: 0, 
    answer: Interaction.Unanswered,
  };

  render() {
    const {task, iconComponent, checkAnswer} = this;
    const Icon = iconComponent.bind(this);

    if (task) {
      return (
        <Box>
          <Heading textAlign="center">{task.symbol}</Heading>
          <Heading level="2" textAlign="center"><Icon /></Heading>
          <Box>
            {task.choices.map<JSX.Element>((choice, index) => {
                return (
                  <Box key={index} margin="small">
                    <Button onClick={checkAnswer.bind(this, choice)}
                            primary
                            size="medium"
                            label={choice.text} />
                  </Box>
                );
            })}
          </Box>
        </Box>
      )
    } else {
      return (
        <Heading textAlign="center">Well done!</Heading>
      )
    }
  }

  private get task() {
    const  { index, tasks } = this.state;
    return tasks[index];
  }

  private iconComponent(): JSX.Element {
    const {answer} = this.state;

    switch (answer) {
      case Interaction.Unanswered:
        return <br />;
      case Interaction.Correct:
        return <Checkmark color="status-ok" />;
      case Interaction.Incorrect:
        return <Close color="status-error" />;
    }
  }

  private checkAnswer(choice: Choice) {
    const index = this.state.index + 1;

    if (choice.text != this.task.answer) {
      const tasks = this.state.tasks.concat(this.task);
      this.setState({ index, tasks, answer: Interaction.Incorrect, });
    } else {
      const tasks = this.state.tasks;
      this.setState({ index, tasks, answer: Interaction.Correct, });
    }
  }
}

export default ActivityComponent;
