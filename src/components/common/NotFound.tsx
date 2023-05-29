import * as React from 'react';
import wentWrongImg from '../../assets/images/wrong.png';

const notFound = () => {
  return (
    <>
      <div className="notFound">
        <span className="text__title-lg">Something went wrong </span>
        <img src={wentWrongImg} alt="something-wrong-img" className="notFound__img" />
      </div>
    </>
  );
};

export default notFound;
