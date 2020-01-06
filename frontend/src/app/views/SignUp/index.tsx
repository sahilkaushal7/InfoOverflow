import * as React from 'react';
import { RouteComponentProps } from 'react-router';

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
    if (!loading) {
      history.push('/');
    }
  }

  return (
    <div>
      This is signup
      <form
        onSubmit={(e) => signUpUser(e)} >
        <p>Please fill in the login details</p>
        <label><b>name : </b></label>
        <input type={'text'} name={'name'} />
        <label><b>email : </b></label>
        <input type={'text'} name={'email'} />
        <label><b>Password : </b></label>
        <input type={'password'} name={'password'} />
        <input type={'submit'} name={'Login'} />
        <br />
      </form>
    </div>
  )
}
