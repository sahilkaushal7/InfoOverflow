import * as React from 'react';
import { IOInput } from '../../IOInput';
import cn from 'classnames';

interface SignUpFormProps {
  submitHandler: (e: any) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ submitHandler }) => {
  return (
    <div>
      <form
        className={cn('io-form')}
        onSubmit={(e) => submitHandler(e)} >
        <p>Please fill in the login details</p>
        <IOInput type={'text'} name={'name'} placeholder={'Enter your name'}/>
        <IOInput type={'text'} name={'email'} placeholder={'Enter your email'}/>
        <IOInput type={'password'} name={'password'} placeholder={'Enter your password'}/>
        <IOInput type={'submit'} name={'Sign Up'} />
        <br />
      </form>
    </div>
  )
}
