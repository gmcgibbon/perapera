import { Box, Button, Heading } from "grommet";
import React, { Component } from "react";
import { Activity, IdentifySymbolTask, MatchingTask, Task, TaskType, TranslateTask } from "../db/types";
import IdentifySymbolTaskComponent from "./tasks/identity-symbol-task";
import MatchingTaskComponent from "./tasks/matching-task";
import TranslateTaskComponent from "./tasks/translate-task";

type Props = {
  activity: Activity;
};

type State = {
  tasks: Task[];
  taskIndex: number;
  taskCompletions: boolean[];
}

class ActivityComponent extends Component<Props, State> {
  readonly state: State = {
    tasks: this.props.activity.generator(),
    taskCompletions: [],
    taskIndex: 0,
  };

  render() {
    const {task, nextTask, finishActivity} = this;

    const Task = () => {
      switch (this.task.type) {
        case TaskType.IdentifySymbol:
          return <IdentifySymbolTaskComponent task={task as IdentifySymbolTask} nextTask={nextTask.bind(this)} />;
        case TaskType.Matching:
          return <MatchingTaskComponent task={task as MatchingTask} nextTask={nextTask.bind(this)} />;
        case TaskType.Translate:
          return <TranslateTaskComponent task={task as TranslateTask} nextTask={nextTask.bind(this)} />;
        default:
          throw new Error(`Unsupported task "${this.task}"`)
      }
    };

    const EndScreen = () => {
      const {taskCompletions} = this.state;
      const correctCount = taskCompletions.filter((bool) => bool).length;
      const totalCount = taskCompletions.length;
      const score = ((correctCount / totalCount) * 100);
      const message = this.messageFor(score);

      return (
        <Box>
          <Heading textAlign="center">{score.toFixed(0)}%</Heading>
          <Heading textAlign="center"
                   level="2">
              {message}
          </Heading>
          <Box alignSelf="center"
               margin="medium">
            <Button onClick={finishActivity}
                    secondary
                    size="large"
                    label="Finish" />
          </Box>
        </Box>
      )
    }

    if (task) {
      return <Task />
    } else {
      return <EndScreen />
    }
  }

  private get task() {
    const  { taskIndex, tasks } = this.state;
    return tasks[taskIndex];
  }

  private finishActivity() {
    document.location.href = "#/";
  }

  private nextTask(correct: boolean) {
    if (correct) {
      const tasks = this.state.tasks;
      const taskIndex = this.state.taskIndex + 1;
      const taskCompletions = this.state.taskCompletions.concat([true]);
      this.setState({ tasks, taskIndex, taskCompletions });
    } else {
      const tasks = this.state.tasks.concat(this.task);
      const taskIndex = this.state.taskIndex + 1;
      const taskCompletions = this.state.taskCompletions.concat([false]);
      this.setState({ tasks, taskIndex, taskCompletions });
    }
  }

  private messageFor(score: number) { 
    if (score >= 90) {
      return "Well done!";
    } else if (score >= 70) {
      return "Good work!";
    } else {
      return "Keep trying!";
    }
  }
}

export default ActivityComponent;
