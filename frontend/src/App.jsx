import React from 'react';
import Notification from "./components/Notification.jsx"; 
import Dashboard from "./components/Dashboard.jsx"; 
import ReviewsBreakdown from "./components/ReviewsBreakdown.jsx"; 
import Performance from "./components/Performance.jsx"; 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import Layout from "./components/Layout.jsx"; 
import Settings from "./components/Settings"; 
import Help from "./components/Help"; 
import Home from './components/Home.jsx';
import ReviewsDisplay from "./components/ReviewDisplay.jsx"; 
import { FilterProvider } from './context/FilterContext';

const App = () => {   
  return (     
    // <FilterProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/breakdown" element={<ReviewsBreakdown />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} /> */}
          </Route>
        </Routes>
      </Router>
    //  </FilterProvider>
  ); 
};  

export default App;