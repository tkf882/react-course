import { useState } from 'react'

import './Login.css';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <>
      <div>
        <input className="login-input" placeholder="Email"/>
      </div>
      <div>
        <input className="login-input" type={showPassword ? 'text' : 'password'} placeholder="Password"/>
        <button className="show-password-button" onClick={togglePassword}>{showPassword ? 'hide' : 'show'}</button>
      </div>
      <button>Login</button>
      <button>Sign up</button>
    </>
  );
}