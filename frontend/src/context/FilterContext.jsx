import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const FilterContext = createContext();

// Create a provider component
export const FilterProvider = ({ children }) => {
  const [selectedPlace, setSelectedPlace] = useState("simple-bar");
  const [selectedOption, setSelectedOption] = useState("last-7-days");
  const [url, setUrl] = useState("https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D");
  const [reviews, setReviews] = useState([]);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [posiper, setPosiper] = useState(0);
    const [negaper, setNegaper] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [counts, setCounts] = useState(0);
    const [click, setClick] = useState(0);
    const [clickRate, setClickRate] = useState(0);
    const [countRate, setCountRate] = useState(0);


  useEffect(() => {
    // Fetch counts from the backend
    axios.get('http://localhost:3000/api/get-counts').then((response) => {
      setCounts(response.data.totalScans);
      setClick(response.data.totalButtonClicks);
      setCountRate(response.data.scanRate);
      setClickRate(response.data.clickRate);
    });
  }, []);

  const placeOptions = {
    "simple-bar": "https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D",
    "complex-bar": "https://www.google.com/maps/search/iem/@22.456918,88.3197996,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
    "bad-bar": "https://www.google.com/maps/place/Techno+Main+Salt+Lake/@22.5760866,88.4251959,17z/data=!4m10!1m2!2m1!1stechno+india+main+salt+lake!3m6!1s0x3a02751a9d9c9e85:0x7fe665c781b10383!8m2!3d22.5761707!4d88.4270293!15sCht0ZWNobm8gaW5kaWEgbWFpbiBzYWx0IGxha2VaHSIbdGVjaG5vIGluZGlhIG1haW4gc2FsdCBsYWtlkgEHY29sbGVnZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOeGNuQlhlSHBSUlJBQuABAPoBBQi-AhAt!16s%2Fg%2F11fml2v54k?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
  };

  const getStartDate = (option) => {
    const today = new Date();
    switch (option) {
      case "last-7-days":
        return new Date(today.setDate(today.getDate() - 7)).toISOString().split("T")[0];
      case "last-30-days":
        return new Date(today.setDate(today.getDate() - 30)).toISOString().split("T")[0];
      case "last-90-days":
        return new Date(today.setDate(today.getDate() - 90)).toISOString().split("T")[0];
      default:
        return new Date(today.setDate(today.getDate() - 7)).toISOString().split("T")[0];
    }
  };

  const calculateSentiment = (reviews) => {
    let positive = 0;
    let negative = 0;

    reviews.forEach((review) => {
      if (review.stars >= 3) {
        positive++;
      } else {
        negative++;
      }
    });

    return { positive, negative };
  };  

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const reviewsStartDate = getStartDate(selectedOption);
      const urlMain = placeOptions[selectedPlace]
      const response = await fetch(
        `http://localhost:3000/api/reviews?url=${encodeURIComponent(urlMain)}&reviewsStartDate=${reviewsStartDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format: Expected JSON");
      }
      const data = await response.json();
      
      // Separate place info from reviews
      const placeData = data.simplifiedReviews.filter((item) => item.type === "placeInfo")[0];
      setPlaceInfo(placeData);
      
      // Set reviews (excluding place info)
      const reviewsData = data.simplifiedReviews.filter(review => review.type === "placeInfo");
      setReviews(reviewsData);
      setChartData(data.reviewsChartData);

      const { positive: pos, negative: neg } = calculateSentiment(reviewsData);

      const numReview = pos + neg;
      const percP = ((pos / numReview) * 100).toFixed(0);
      const percN = ((neg / numReview) * 100).toFixed(0);

      // setPlaceInfo(placeData);
      setPositive(pos);
      setNegative(neg);
      setPosiper(percP);
      setNegaper(percN);
      
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Determine milestone based on reviews count
  const determineMilestone = (reviewsCount) => {
    if (reviewsCount < 10) return 'Beginner';
    if (reviewsCount < 50) return 'Amateur';
    if (reviewsCount < 100) return 'Challenger';
    if (reviewsCount < 500) return 'Master';
    if (reviewsCount < 1000) return 'Legend';
    return 'Grandmaster';
  };

  const handleFilterClick = () => {
    setUrl(placeOptions[selectedPlace]);
    fetchReviews();
    setLoading(true); // Show loading state
    setError("");
  };
  useEffect(() => {
    
    fetchReviews();
  }, [])
 

  return (
    <FilterContext.Provider value={{
      selectedPlace,
      setSelectedPlace,
      selectedOption,
      setSelectedOption,
      url,
      setUrl,
      reviews,
      placeInfo,
      loading,
      error,
      handleFilterClick,
      fetchReviews,
      placeOptions,
      determineMilestone,
      chartData,
      setChartData,
      posiper,
      negaper,
      negative,
      counts,
      click,
      clickRate,
      countRate,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};