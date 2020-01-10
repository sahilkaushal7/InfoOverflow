import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IOCard } from '../../../lib/components/IOCards';
import { SignUpForm } from '../../../lib/elements/IOForm';

interface SignUpProps extends RouteComponentProps {
  loading: boolean;
  userSignUp: (name: string, email: string, password: string) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ userSignUp, history, loading }) => {
  const signUpUser = (e: any) => {
    e.preventDefault();
    const target = e.target.elements;
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    userSignUp(name, email, password);
    history.push('/login');
  }

  return (
    <IOCard>
      <SignUpForm submitHandler={signUpUser}/>
    </IOCard>
  )
}
