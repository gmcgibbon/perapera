import { Box, Button, Footer, Grid, Heading, TextArea } from "grommet";
import { Checkmark, Close } from "grommet-icons";
import React, { Component } from "react";
import { TranslateTask } from "../../db/types";

type Props = {
  nextTask: (correct: boolean) => void;
  task: TranslateTask;
};

type State = {
  translation?: string;
  submit: boolean;
}

class TranslateTaskComponent extends Component<Props, State> {
  readonly state: State = { submit: false };

  render() {
    const Icon = () => {
      const {translation} = this.state;

      if (this.isCorrect(translation)) {
        return <Checkmark color="status-ok" />
      } else {
        return <Close color="status-error" />
      }
    }
    const NextFooter = () => {
      const {submit} = this.state;
      const {done} = this;

      if (submit) {
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

    const Correction = () => {
      const {task} = this.props;
      const {submit, translation} = this.state;

      if (submit && !this.isCorrect(translation)) {
        return (
          <Heading textAlign="center"
                   color="status-error"
                   level='2'>
            {task.answers[0]}
          </Heading>
        );
      } else {
        return null;
      }
    }

    const {task} = this.props; 
    const {submit, translation} = this.state;

    return (
      <Box>
        <Heading textAlign="center">{task.text}</Heading>
        <Grid rows={['small', 'xxsmall']}
              columns={['medium']}
              gap="small"
              alignSelf="center"
              margin="medium">
          <TextArea
            placeholder="Translate"
            value={translation}
            disabled={submit}
            onChange={({target: {value}}) => this.setState({translation: value})}
          />
          <Button label="Go"
                  primary
                  disabled={submit}
                  onClick={() => this.finishTranslation(translation)} />
        </Grid>
        <Correction />
        <NextFooter />
      </Box>
    )
  }

  private done() {
    const {nextTask} = this.props;
    const {translation} = this.state;
    
    nextTask(this.isCorrect(translation));
  }

  private isCorrect(text: string) {
    const {task} = this.props;
    return task.answers.includes(text);
  }

  private finishTranslation(translation: string) {
    translation = translation.replace(/\s+/, '')

    if (!translation.endsWith('。')) {
      translation = `${translation}。`;
    }

    this.setState({submit: true, translation})
  }
}

export default TranslateTaskComponent;
