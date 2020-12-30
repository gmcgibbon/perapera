import { Box, Button, Footer, Grid, Heading } from "grommet";
import { Checkmark } from "grommet-icons";
import React, { Component } from "react";
import { Choice, MatchingTask } from "../../db/types";

type Props = {
  nextTask: (correct: boolean) => void;
  task: MatchingTask;
};

type State = {
  selectedChoiceKey?: Choice;
  selectedChoiceValue?: Choice;
  correctedChoiceKeys: Choice[];
  correctedChoiceValues: Choice[];

}

class MatchingTaskComponent extends Component<Props, State> {
  readonly state: State = { correctedChoiceKeys: [], correctedChoiceValues: [] };

  render() {
    const Icon = () => {
      return <Checkmark color="status-ok" />
    }

    const OptionList = () => {
      const {task} = this.props;
      const {selectChoiceKey, selectChoiceValue} = this;
      const {
        selectedChoiceKey,
        selectedChoiceValue,
        correctedChoiceKeys,
        correctedChoiceValues,
      } = this.state;
      const {choices} = this.props.task;

      return (
        <Grid columns={['small', 'small']}
              rows={new Array(Math.ceil(task.choices.size / 2)).fill('xxsmall')}
              gap="small"
              alignSelf="center"
              margin="medium">
          {Array.from(choices).map<JSX.Element>(([choiceKey, choiceValue], index) => {
            return (
              <React.Fragment key={index}>
                <Box>
                  <Button onClick={selectChoiceKey.bind(this, choiceKey)}
                          primary
                          disabled={!!selectedChoiceKey || correctedChoiceKeys.includes(choiceKey)}
                          size="large"
                          label={choiceKey.text} />
                </Box>
                <Box key={index}>
                  <Button onClick={selectChoiceValue.bind(this, choiceValue)}
                          primary
                          disabled={!!selectedChoiceValue || correctedChoiceValues.includes(choiceValue)}
                          size="large"
                          label={choiceValue.text} />
                </Box>
              </React.Fragment>
            );
          })}
        </Grid>
      )
    }
    const NextFooter = () => {
      const {answers} = this.props.task;
      const {correctedChoiceKeys} = this.state;
      const {done} = this;

      if (correctedChoiceKeys.length == answers.size) {
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
        <Heading textAlign="center">Match</Heading>
        <OptionList />
        <NextFooter />
      </Box>
    )
  }

  private done() {
    const {nextTask} = this.props;
    nextTask(true);
  }

  private isCorrect(choiceKey: Choice, choiceValue: Choice) {
    const {task} = this.props;
    return task.answers.get(choiceKey.text) === choiceValue.text;
  }

  private selectChoiceKey(choice: Choice) {
    const {selectedChoiceValue} = this.state;
    this.setState({ selectedChoiceKey: choice })
    
    if (selectedChoiceValue) {
      this.correctChoicePair(choice, selectedChoiceValue);
    }
  }

  private selectChoiceValue(choice: Choice) {
    const {selectedChoiceKey} = this.state;
    this.setState({ selectedChoiceValue: choice })
    
    if (selectedChoiceKey) {
      this.correctChoicePair(selectedChoiceKey, choice);
    }
  }

  private correctChoicePair(choiceKey: Choice, choiceValue: Choice) {
    const {correctedChoiceKeys, correctedChoiceValues} = this.state;

    if (this.isCorrect(choiceKey, choiceValue)) {
      correctedChoiceKeys.push(choiceKey);
      correctedChoiceValues.push(choiceValue);
    }

    this.setState({
      correctedChoiceKeys,
      correctedChoiceValues,
      selectedChoiceKey: undefined,
      selectedChoiceValue: undefined,
    });


  }
}

export default MatchingTaskComponent;
