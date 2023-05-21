import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '../config';
import http from '../utils/http';
import { useAuth } from '../hooks/useAuth';
import signin from '../assets/images/signin.png';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const isDisabled = !email || !password || isSubmitting;

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await http.post(config.endpoints.signIn, { email, password });
      const { accessToken } = response.data;

      setToken(accessToken);
      navigate('/');
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return (
    <div className="signin">
      <img src={signin} alt="signin-background" className="signin__image" />
      <div className="signin__wrapper">
        <div className="text__title-lg--color mb-lg">Welcome!</div>

        <input
          className="input__text mb-md"
          placeholder="Your email address"
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="input__text mb-sm"
          placeholder="Your password"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="disp-flex mb-lg flex-space-between ">
          <span className="text__label-sm">Remember my password</span>
          <button className="btn btn__link" onClick={() => navigate('/signup')}>
            Sign up?
          </button>
        </div>
        <div className="btn__wrapper">
          <button className="btn btn__primary" disabled={isDisabled} onClick={handleSubmit}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
