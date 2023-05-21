import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/styles/Main.scss';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import * as routes from './constants/routes';
import { AuthContext } from './context/AuthContext';
import PractitionerList from './pages/PractitionerList';
import localStorageUtil from './utils/localStorageUtil';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const [token, setToken] = React.useState<string | null>(localStorageUtil.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorageUtil.setItem('token', token);
    } else {
      localStorageUtil.removeItem('token');
    }
  }, [token]);

  return (
    <div className="App">
      <div className="container">
        <AuthContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<PractitionerList />} />
              </Route>
              <Route path={routes.SIGNIN} element={<Signin />} />
              <Route path={routes.SIGNUP} element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
