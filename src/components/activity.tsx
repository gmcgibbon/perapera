import { Box, Button, Footer, Grid, Heading } from "grommet";
import { Checkmark, Close } from "grommet-icons";
import React, { Component } from "react";
import { Activity, Choice, Task } from "../db/types";

type Props = {
  activity: Activity;
};

type State = {
  tasks: Task[];
  taskIndex: number;
  selectedChoice?: Choice;
}

class ActivityComponent extends Component<Props, State> {
  readonly state: State = {
    tasks: this.props.activity.generator(),
    taskIndex: 0,
  };

  render() {
    const {selectedChoice} = this.state;
    const {task, selectChoice, nextTask, finishActivity} = this;
    
    const Icon = () => {
      if (!selectedChoice) {
        return <br />;
      }
      
      if (this.isCorrect(selectedChoice)) {
        return <Checkmark color="status-ok" />;
      } else {
        return <Close color="status-error" />;
      }
    }

    const OptionList = () => {
      return (
        <Grid columns={['small', 'small']}
              rows={new Array(Math.ceil(task.choices.length / 2)).fill('xxsmall')}
              gap="small"
              alignSelf="center"
              margin="medium">
          {task.choices.map<JSX.Element>((choice, index) => {
            return (
              <Box key={index}>
                      <Button onClick={selectChoice.bind(this, choice)}
                              primary
                              color={this.buttonColor(choice)}
                              disabled={!!selectedChoice}
                              size="large"
                              label={choice.text} />
              </Box>
            );
          })}
      </Grid>
      )
    }
    const NextFooter = () => {
      if (selectedChoice) {
        return (
          <Footer animation="slideUp" justify="end" margin="small">
              <Icon />
              <Button onClick={nextTask.bind(this)}
                      secondary
                      size="medium"
                      label="Next" />
          </Footer>
        );
      } else {
        return null;
      }
    }

    if (task) {
      return (
        <Box>
          <Heading textAlign="center">{task.symbol}</Heading>
          <OptionList />
          <NextFooter />
        </Box>
      )
    } else {
      return (
        <Box>
          <Heading textAlign="center">Well done!</Heading>
          <Box alignSelf="center">
            <Button onClick={finishActivity}
                    secondary
                    size="large"
                    label="Finish" />
          </Box>
        </Box>
      )
    }
  }

  private get task() {
    const  { taskIndex, tasks } = this.state;
    return tasks[taskIndex];
  }

  private buttonColor(choice?: Choice) {
    if (this.state.selectedChoice) {
      if (this.isCorrect(choice)) {
        return "neutral-1"
      }

      if (this.state.selectedChoice == choice) {
        return "status-error";
      }
    } else {
      return "brand"
    }
  }

  private isCorrect(choice: Choice) {
    return choice && choice.text == this.task.answer;
  }

  private finishActivity() {
    document.location.href = "/";
  }

  private nextTask() {
    const taskIndex = this.state.taskIndex + 1;
    this.setState({ taskIndex, selectedChoice: undefined });
  }

  private selectChoice(choice: Choice) {
    if (this.isCorrect(choice)) {
      const tasks = this.state.tasks;
      this.setState({ tasks, selectedChoice: choice });
    } else {
      const tasks = this.state.tasks.concat(this.task);
      this.setState({ tasks, selectedChoice: choice });
    }
  }
}

export default ActivityComponent;
