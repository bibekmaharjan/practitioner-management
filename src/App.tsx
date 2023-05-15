import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import './assets/styles/Main.scss';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import * as routes from './constants/routes';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));

  React.useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className="App">
      <div className="container">
        <AuthContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
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
