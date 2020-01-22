import React from 'react';
import { getQuestionsList } from '../requests';
import { AxiosResponse } from 'axios';
import { IOQuestionCard } from '../../../../lib/components/IOCards/components/IOQuestionCard';

interface QuestionsListProps { }

const QuestionsList: React.FC<QuestionsListProps> = () => {
  const [questionsList, setQuestionsList] = React.useState([]);
  React.useEffect(() => {
    getQuestionsList().then((res: AxiosResponse) => setQuestionsList(res.data))
  }, [])
  return (
    <div className={'io-question-list'}>
      {questionsList.map((question, i) => (
        <div key={i}>
          <IOQuestionCard question={question} />
        </div>
      ))}
    </div>
  )
}


export default QuestionsList;
