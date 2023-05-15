import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/styles/Main.scss';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import * as routes from './constants/routes';
import { AuthContext } from './context/AuthContext';
import PractitionerList from './pages/PractitionerList';
import PractitionerProfile from './pages/PractitionerProfile';
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
                <Route path="/" element={<PractitionerList />} />
                <Route path={routes.PROFILE} element={<PractitionerProfile />} />
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
