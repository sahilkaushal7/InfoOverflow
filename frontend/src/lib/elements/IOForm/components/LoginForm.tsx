import * as React from 'react';
import { IOInput } from '../../IOInput';
import { IOLink } from '../..';
import { signupUrlsRoot } from '../../../../app/urls';
import cn from 'classnames';

interface LoginFormProps {
  submitHandler: (e: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ submitHandler }) => {
  return (
    <div>
      <form
        className={cn('io-form')}
        onSubmit={(e) => submitHandler(e)} >
        <p>Please fill in the login details</p>
        <IOInput type={'text'} name={'email'} placeholder={'Enter your email'} />
        <IOInput type={'password'} name={'password'} placeholder={'Enter your password'} />
        <IOInput type={'submit'} name={'Login'} />
        <br />
      </form>
      Dont have an account ?
      Please Sign Up <IOLink to={signupUrlsRoot}>here</IOLink>
    </div>
  )
}
