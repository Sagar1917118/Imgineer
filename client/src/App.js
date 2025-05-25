import './App.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './Components/GoogleLogin';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
// import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import RefreshHandler from './utils/RefreshHandler';
import NotFound from './Components/NotFound';
import Dashboard from './Asset_Components/Dashboard';
import HomePage from './Components/HomePage';
import { useApp } from './context/AppContext';
function App() {
  const {isAuthenticated,setIsAuthenticated}=useApp();
	const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLEINT_ID}>
      <HomePage isAuthenticated={isAuthenticated}></HomePage>
		</GoogleOAuthProvider>
	)
	const PrivateRoute = ({ element }) => {
		return isAuthenticated ? element : <Navigate to="/login" />
	}
	return (
    <div className='App'>
      <BrowserRouter>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<GoogleWrapper/>}></Route>
          {/* <Route path="/login" element={} /> */}
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          {/* <Route path="/" element={<Navigate to="/login" />} />
           */}
          {/* <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/> */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  </div>
	);
}

export default App
