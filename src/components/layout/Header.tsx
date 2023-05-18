import * as React from 'react';

import { useAuth } from '../../hooks/useAuth';
import headerIcon from '../../assets/images/user-icon.png';

const Header = () => {
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <img src={headerIcon} alt="header-icon" className="header__icon mr-sm" />
          <span className="text__title-lg">Practitioner</span>
        </div>
        <div className="btn__wrapper">
          <button className="btn btn__danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
