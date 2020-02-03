import React from 'react';
import { AxiosResponse } from 'axios';
import { getQuestionDetail } from '../requests';

interface QuestionDetailsProps {
  urlParams: {
    id?: number;
  }
}

const QuestionDetails: React.FC<QuestionDetailsProps> = ({ urlParams: { id } }) => {
  const [questionsList, setQuestionDetails] = React.useState();
  React.useEffect(() => {
    if (id) {
      getQuestionDetail(id).then((res: AxiosResponse) => setQuestionDetails(res.data))
    }
  }, [id])
  return (
    <div className={'io-question-list'}>
      {JSON.stringify(questionsList)}
    </div>
  )
}


export default QuestionDetails;
