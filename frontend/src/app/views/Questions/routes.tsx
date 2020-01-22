import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { questionsUrlsRoot } from '../../urls';
import { Landing } from '../Landing';
import QuestionsList from './components/List';

interface QuestionsRouteProps { }

const QuestionsRoute: React.FC<QuestionsRouteProps> = () => {
  return (
    <Switch>
      <Route exact path={questionsUrlsRoot} component={QuestionsList} />
      <Route path={'*'} component={Landing} />
    </Switch>
    )
}

export default QuestionsRoute;
