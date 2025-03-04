import React, { useEffect, useState } from 'react'
import Notification from './components/Notification.jsx'
import Dashboard from './components/Dashboard.jsx'
import ReviewsBreakdown from './components/ReviewsBreakdown.jsx'
import Performance from './components/Performance.jsx'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Settings from './components/Settings';
import Help from './components/Help';
import ReviewsDisplay from './components/ReviewDisplay.jsx'

const App = () => {
  // const [placeInfo, setPlaceInfo] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  // useEffect(() => {
  //     // Fetch from your backend API
  //     fetch("http://localhost:3000/api/reviews")
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch reviews");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // Separate place info from reviews
  //         const placeData = data.filter((item) => item.type === "placeInfo");
  //         // const reviewsData = data.filter((item) => item.type === "review");
  
  //         setPlaceInfo(placeData);
  //         console.log(placeData)
  //         // setReviews(reviewsData);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setError(err.message);
  //         setLoading(false);
  //       });
  //   }, []);https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync?token=apify_api_mYE768NcuWmCx6C8N5YmGegdmgtC630Tlg2u
  return (
    <>
     <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/breakdown" element={<ReviewsBreakdown />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Layout>
  </Router>
    </>
  )
}

export default App