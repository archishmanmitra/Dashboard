import React, { useState, useEffect } from "react";

const ReviewsDisplay = () => {
  const [placeInfo, setPlaceInfo] = useState(null);
  // const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch from your backend API
    fetch("http://localhost:3000/api/reviews")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        return response.json();
      })
      .then((data) => {
        // Separate place info from reviews
        const placeData = data.filter((item) => item.type === "placeInfo");
        // const reviewsData = data.filter((item) => item.type === "review");

        setPlaceInfo(placeData);
        // setReviews(reviewsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading reviews...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {placeInfo && (
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">{placeInfo[0].title}</h2>
          <div className="flex justify-center items-center mt-2">
            {renderStars(Math.round(placeInfo[0].totalScore))}
            <span className="ml-2 text-gray-600 text-lg">
              {placeInfo[0].totalScore.toFixed(1)} ({placeInfo[0].reviewsCount} reviews)
            </span>
          </div>
          <p className="text-gray-500 mt-1">{placeInfo[0].address}</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Reviews
      </h3>
      
      {placeInfo.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews available.</p>
      ) : (
        <div className="space-y-4">
          {placeInfo.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <h4 className="text-lg font-medium text-gray-800">{review.name}</h4>
              <div className="flex items-center">{renderStars(review.stars)}</div>
              <p className="text-sm text-gray-500">
                {new Date(review.publishedAtDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{review.text??'No text'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ReviewsDisplay;
