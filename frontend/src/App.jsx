import React, { createContext, useReducer } from 'react';
import { Route, Routes, } from "react-router-dom";
import '@material-design-icons/font';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Home from './pages/Home Page/Home';
import Logout from './pages/Logout/Logout';
import Register from './pages/Register/Register';
import Complaint from './pages/Complaint/Complaint';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from "./pages/Error Page/ErrorPage"
import StaffDashboard from './Staff Pages/Dashboard/StaffDashboard';

import { initialState, reducer } from "./reducer/useReducer";
import PreviousComplaints from './Staff Pages/Complaint/PreviousComplaint';
import StudentDetails from './Staff Pages/StudentDetails/StudentDetails';

// Context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/staff/dashboard' element={<StaffDashboard />} />
      <Route path='/complaint' element={<Complaint />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/staffComplaints' element={<PreviousComplaints />} />
      <Route path='/studentDetails/:userId' element={<StudentDetails />} />

      <Route path='*' element={<ErrorPage />} />

    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>

        <Routing />

      </UserContext.Provider>
    </>
  );
}

export default App;
