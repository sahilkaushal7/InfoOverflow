import * as React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { questionUrls } from '../../urls';
import { Landing } from '../Landing';
import QuestionsList from './components/List';
import QuestionDetails from './components/QuestionDetails';

interface QuestionsRouteProps { }

const QuestionsRoute: React.FC<QuestionsRouteProps> = () => {
  return (
    <Switch>
      <Route exact path={questionUrls.landing()} component={QuestionsList} />
      <Route exact path={questionUrls.questionDetails()} render={(props: RouteComponentProps) => <QuestionDetails urlParams={props.match.params} />} />
      <Route path={'*'} component={Landing} />
    </Switch>
  )
}

export default QuestionsRoute;
