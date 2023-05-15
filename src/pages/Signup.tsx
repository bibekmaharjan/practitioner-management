import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = !email || !password || isSubmitting;

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(config.endpoints.signUp, { email, password });

      navigate('/signin');
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return (
    <div className="signin">
      <div className="signin__wrapper">
        <div className="text__title-lg--color mb-lg">Welcome!</div>

        <input
          className="input__text mb-md"
          placeholder="YOUR MAIL"
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="input__text mb-sm"
          placeholder="YOUR PASSWORD"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="disp-flex mb-lg flex-space-between ">
          <span className="text__label-sm">Have an account?</span>
          <button className="btn btn__link" onClick={() => navigate('/signin')}>
            Sign in?
          </button>
        </div>
        <div className="btn__wrapper">
          <button className="btn btn__primary" disabled={isDisabled} onClick={handleSubmit}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
