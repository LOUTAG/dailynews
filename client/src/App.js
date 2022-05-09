import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AddNews from "./pages/AddNews";
import NewDescription from "./pages/NewDescription";
import PostedNewItems from './pages/PostedNewItems';
import Profile from "./pages/Profile";
import EditNews from './pages/EditNews';

const App=()=> {

  const ProtectedRoute=({children})=>{
    if(localStorage.getItem('dailynews-user')){
      return children;
      //children here refer to the route
    }else{
      return <Navigate to='/' />
    }
  }

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/add' element={<ProtectedRoute><AddNews /></ProtectedRoute>} />
          <Route path='/posted' element={<ProtectedRoute><PostedNewItems /></ProtectedRoute>} />
          <Route path='/newdescription/:id' element={<ProtectedRoute><NewDescription /></ProtectedRoute>} />
          <Route path='/editnews/:id' element={<ProtectedRoute><EditNews /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='*' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
