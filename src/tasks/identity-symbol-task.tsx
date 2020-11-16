import { Box, Button, Footer, Grid, Heading } from "grommet";
import { Checkmark, Close } from "grommet-icons";
import React, { Component } from "react";
import { Choice, IdentifySymbolTask } from "../db/types";

type Props = {
  nextTask: (correct: boolean) => void;
  task: IdentifySymbolTask;
};

type State = {
  selectedChoice?: Choice;
}

class IdentifySymbolTaskComponent extends Component<Props, State> {
  readonly state: State = {};

  render() {
    const {task} = this.props;
    const {selectedChoice} = this.state;
    const {selectChoice, done} = this;
    
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
              <Button onClick={done.bind(this)}
                      secondary
                      size="medium"
                      label="Next" />
          </Footer>
        );
      } else {
        return null;
      }
    }

    return (
      <Box>
        <Heading textAlign="center">{task.symbol}</Heading>
        <OptionList />
        <NextFooter />
      </Box>
    )
  }

  private done() {
    const {nextTask} = this.props;
    const {selectedChoice} = this.state;
    nextTask(this.isCorrect(selectedChoice));
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
    const {task} = this.props;
    return choice && choice.text == task.answer;
  }

  private selectChoice(choice: Choice) {
    if (this.isCorrect(choice)) {
      this.setState({ selectedChoice: choice });
    } else {
      this.setState({ selectedChoice: choice });
    }
  }
}

export default IdentifySymbolTaskComponent;
