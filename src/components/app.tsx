import React, { Component} from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import LessonPage from "./pages/lesson";
import LessonsPage from "./pages/lessons";
import {lessonDb} from "../db";
import useParams, { IdParam } from "../hooks/use-params";
import "./app.scss";
import { Box } from "grommet/components/Box";

type Props = {};

class AppComponent extends Component<Props> {
  private static LessonsPageRouter(): JSX.Element {
    const {where} = lessonDb;
    return <LessonsPage lessons={where()} />
  }
  
  private static LessonPageRouter(): JSX.Element {
    const {find} = lessonDb;
    const {id} = useParams<IdParam>();
    const lesson = find(id);
    return <LessonPage lesson={lesson} />
  }

  render() {
    const {
      LessonsPageRouter,
      LessonPageRouter
    } = AppComponent;
    return (
      <Box
        align="center"
        pad="medium"
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/lessons" />
          </Route>
          <Route exact path="/lessons">
            <LessonsPageRouter />
          </Route>
          <Route path="/lessons/:id">
            <LessonPageRouter />
          </Route>
        </Switch>
      </Box>
    )
  }
}

export default AppComponent;
