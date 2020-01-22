import * as React from 'react';
import cn from 'classnames';
import { Question } from '../../../../app/types';

interface IOQuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: Question;
  className?: string;
}

export const IOQuestionCard: React.FC<IOQuestionCardProps> = ({ question: {
  title,
  user,
  description,
  tags,
}, className }) => {
  return (
    <div className={cn('io-card', 'io-question-card', className)}>
      <b>{title}</b>
      <b>{user.name}</b>
      <p>{description}</p>
      <p>{tags.split(',').map(tag => tag)}</p>
    </div>
  )
}
