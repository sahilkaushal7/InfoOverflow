import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IOCard } from '../../../lib/components/IOCards';
import { LoginForm } from '../../../lib/elements/IOForm';

interface LoginProps extends RouteComponentProps {
  userLogin: (email: string, password: string) => void;
  loading: boolean;
}

const Login: React.FC<LoginProps> = ({ userLogin, history, loading }) => {
  const loginSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    userLogin(email, password);
    if (!loading) {
      history.push('/');
    }
  }
  return (
    <IOCard>
        <LoginForm submitHandler={loginSubmit} />
    </IOCard>
  )
}

export default Login;
