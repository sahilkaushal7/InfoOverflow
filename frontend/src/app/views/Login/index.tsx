import React from 'react';

interface LoginProps {
  userLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ userLogin }) => {
  const loginSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    userLogin(email, password);
  }
  return (
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
  )
}

export default Login;