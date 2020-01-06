import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IOLink } from '../../../lib/elements';

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
    if(!loading) {
      history.push('/');
    }
  }
  return (
    <>
    <form
      onSubmit={(e) => loginSubmit(e)} >
      <p>Please fill in the login details</p>
      <label><b>email : </b></label>
      <input type={'text'} name={'email'} />
      <label><b>Password : </b></label>
      <input type={'password'} name={'password'} />
      <input type={'submit'} name={'Login'} />
      <br />
    </form>
    Dont have an account ?
    Please Sign Up <IOLink to={'/signup'}>here</IOLink>
    </>
  )
}

export default Login;
