import * as React from 'react';
import cn from 'classnames';

interface IOInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: any;
}

export const IOInput = React.forwardRef(({ type, name, placeholder, onChange, ...rest }: IOInputProps, ref) => {
  return (
    <input type={type} name={name} placeholder={placeholder} className={cn('io-input')} onChange={onChange} ref={ref} {...rest} />
  )
});
