import * as React from 'react';
import cn from 'classnames';
import { Question } from '../../../../app/types';
import { IOLink } from '../../../elements';
import { questionUrls } from '../../../../app/urls';

interface IOQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: Question;
  className?: string;
}

export const IOQuestionCard: React.FC<IOQuestionCardProps> = ({ question: {
  title,
  user,
  description,
  tags,
  id,
}, className }) => {
  return (
    <div className={cn('io-card', 'io-question-card', className)}>
      <b>{title}</b>
      <b>{user.name}</b>
      <p>{description}</p>
      <p>{tags.split(',').map(tag => tag)}</p>
      <IOLink to={questionUrls.questionDetails(id)}>Get answers</IOLink>
    </div>
  )
}
