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
        <>
          <h2>{task.symbol}</h2>
          <ul>
            {task.choices.map<JSX.Element>((choice, index) => {
              return <li key={index} onClick={checkAnswer.bind(this, choice)}>{choice.text}</li>;
            })}
          </ul>
        </>
      )
    } else {
      return (
        <h2>Well done!</h2>
      )
    }
  }
}

export default ActivityComponent;
