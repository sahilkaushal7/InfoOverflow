import React from 'react';
import { getQuestionsList } from '../requests';
import { AxiosResponse } from 'axios';

interface QuestionsListProps { }

const QuestionsList: React.FC<QuestionsListProps> = () => {
  const [questionsList, setQuestionsList] = React.useState([]);
  React.useEffect(() => {
    getQuestionsList().then((res: AxiosResponse) => setQuestionsList(res.data))
  }, [])
  return (
    <div>{JSON.stringify(questionsList)}</div>
  )
}


export default QuestionsList;
