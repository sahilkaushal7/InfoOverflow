import * as React from 'react';
import cn from 'classnames';
import './styles.scss';

interface IOInputProps {
  type: string;
  name: string;
  placeholder?: string;
}

export const IOInput: React.FC<IOInputProps> = ({ type, name, placeholder }) => {
  return (
    <input type={type} name={name} placeholder={placeholder} className={cn('io-input')}/>
  )
}
