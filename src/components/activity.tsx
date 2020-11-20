import { Box, Button, Heading } from "grommet";
import React, { Component } from "react";
import { Activity, IdentifySymbolTask, Task, TaskType } from "../db/types";
import IdentifySymbolTaskComponent from "./tasks/identity-symbol-task";

type Props = {
  activity: Activity;
};

type State = {
  tasks: Task[];
  taskIndex: number;
}

class ActivityComponent extends Component<Props, State> {
  readonly state: State = {
    tasks: this.props.activity.generator(),
    taskIndex: 0,
  };

  render() {
    const {task, nextTask, finishActivity} = this;

    const Task = () => {
      switch (this.task.type) {
        case TaskType.IdentifySymbol:
          return <IdentifySymbolTaskComponent task={task as IdentifySymbolTask} nextTask={nextTask.bind(this)} />;
        default:
          throw new Error(`Unsupported task "${this.task}"`)
      }
    };

    if (task) {
      return <Task />
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

  private finishActivity() {
    document.location.href = "/";
  }

  private nextTask(correct: boolean) {
    if (correct) {
      const tasks = this.state.tasks;
      const taskIndex = this.state.taskIndex + 1;
      this.setState({ tasks, taskIndex, });
    } else {
      const tasks = this.state.tasks.concat(this.task);
      const taskIndex = this.state.taskIndex + 1;
      this.setState({ tasks, taskIndex, });
    }
  }
}

export default ActivityComponent;
