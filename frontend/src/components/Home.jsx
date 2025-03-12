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
        {/* Background image */}
        <img
          src="/background.jpg"
          alt="Luxury Jewelry Display"
          className="h-[49vh] md:h-[69vh] w-full object-cover"
        />

        {/* Top gradient overlay */}
        <div
          className="absolute top-0 left-0 right-0 h-[10vh] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.37) 100%)'
          }}
        />


        {/* Bottom gradient overlay */}
        <div
          className="absolute md:top-[39vh] top-[24vh] h-[170px] inset-0 md:h-[211px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.8) 90%, #000000 100%)'
          }}
        />

        {/* Content container - adjusted for left alignment and bottom positioning */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Logo section at top */}
          <div className="flex flex-col items-center gap-2 mt-20 md:mt-32 ">
            <img
              src="/logo.jpg"
              alt="SD Fashion Logo"
              className="md:w-[100px] md:h-[100px] h-21 w-21 object-cover rounded-full"
            />
            <h2 className="text-xl mt-1 text-center">S.D. Fashion</h2>
          </div>

          {/* Text and button section at bottom */}
          <div className="flex flex-col mb-0">
            <h1 className="text-5xl md:text-5xl font-medium mb-4 md:text-center text-left">
              <span className="text-white">Share Your </span>
              <span className="text-gradient-gold">Valuable</span>
              <span className="text-white"> Feedback!</span>
            </h1>

            <p className="text-[#B6B6B6] mb-4 text-left md:text-center text-sm">
              Tap below to leave a review. It takes less than a minute. Thank you!
            </p>

            <button
              onClick={handleReviewClick}
              className="w-full bg-white text-black py-3 rounded-lg px-6 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <img src="/google.svg" alt="google" />
              <span>Rate Us on Google</span>
            </button>

            <p className="text-center text-sm text-[var(--color-scan-text)] mt-5">
              Powered by Star Boom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}