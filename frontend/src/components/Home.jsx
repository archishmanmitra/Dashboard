import React from 'react';
import { Star } from 'lucide-react';
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Log the scan when the page loads
    axios.post('http://localhost:3000/api/log-scan');
  }, []);

  const handleReviewClick = () => {
    // Log the button click
    axios.post('http://localhost:3000/api/log-button-click');
    window.open('https://www.google.com/maps?sca_esv=9214e60237169270&rlz=1C1ONGR_en-GBIN1071IN1071&output=search&q=techno+main+salt+lake&source=lnms&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBv10Kbgy3ptSBM6mMfaz8zDVX4b2W1tiDkb3uUgOX2bJ3a5BLG7BkjuQ4GCVNnHDBVV8AikdpKXTHc3QzL9r29OsmnWG9YyUq2HKDk92VPIGBTiroTgAhnMApiY7Y7Ee9UH5_IVpOJ56QvX16CCwZmL-eFirhkCq3ojEZn8tyFPiJegzIg&entry=mc&ved=1t:200715&ictx=111', "_blank");
  };
  return (
    <div className="h-screen bg-black text-white">
      <div className="h-full flex flex-col items-center relative">
        <img
          src="/background.jpg"
          alt="Luxury Jewelry Display"
          className="h-[50vh] left-[-60px] w-full object-cover"
        />
        <div
          className="absolute md:top-[30vh] top-[20.5vh] h-[200px] inset-0 md:h-[211px]"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center p-6">
          <div className="h-3"
            style={{
              background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.37) 100%)"
            }}></div>
          <div className="flex flex-col items-center gap-5 mb-12 justify-center">

            <img
              src="/logo.jpg"
              alt="SD Fashion Logo"
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <h2 className="text-2xl font-bold text-center mb-2">S.D. Fashion</h2>

          </div>
          <h1 className="text-6xl font-medium mb-2">
            <span className="text-white">Share Your </span>
            <span className="text-amber-400">Valuable</span>
            <span className="text-white"> Feedback!</span>
          </h1>
          <p className="text-gray-300 mb-6 text-center">
            Tap below to leave a review. It takes less than a minute. Thank you!
          </p>

          <button onClick={handleReviewClick} className="w-full bg-white text-black py-3 px-6 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
            <Star className="w-5 h-5" />
            Rate Us on Google
          </button>
          <p className="text-center text-sm text-gray-400 mt-4">
            Powered by Star Boom
          </p>
        </div>
      </div>
    </div>
  );
}