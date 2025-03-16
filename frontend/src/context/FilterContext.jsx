import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const FilterContext = createContext();

// Create a provider component
export const FilterProvider = ({ children }) => {
  const [selectedPlace, setSelectedPlace] = useState("simple-bar");
  const [selectedOption, setSelectedOption] = useState("last-7-days");
  const [url, setUrl] = useState(
    "https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
  );
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
  const [analysis, setAnalysis] = useState("");
  const [milestone, setMilestone] = useState(null);
  const [previousMilestone, setPreviousMilestone] = useState(null);
  const [negativeReviews, setNegativeReviews] = useState([]);
  const [showMilestoneNotification, setShowMilestoneNotification] =
    useState(false);
  const [milestoneData, setMilestoneData] = useState({
    current: "Beginner",
    previous: null,
  });
  const [places, setPlaces] = useState([]);
  const [repliedReviewIds, setRepliedReviewIds] = useState([]);
  const [admin, setAdmin] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const placeNames = [
    "Techno India University, West Bengal",
    "Techno Main Salt Lake",
    "Salt Pepper",
  ];
  useEffect(() => {
    // Fetch counts from the backend
    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/api/get-counts`).then((response) => {
      setCounts(response.data.totalScans);
      setClick(response.data.totalButtonClicks);
      setCountRate(response.data.scanRate);
      setClickRate(response.data.clickRate);
    });
  }, []);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/get-admin`);
        const data = await response.json();
        setAdmin(data.username);
        if (response.ok) {
          console.log("Admin username:", data.username);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    // Call the function
    fetchAdmin();
  }, []);
  useEffect(() => {
    const fetchPlaces = async () => {
      const placeDetails = await Promise.all(
        placeNames.map(async (placeName) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/api/places?query=${placeName}`
          );
          const data = await response.json();
          return { placeName, details: data.placeDetails };
        })
      );
      setPlaces(placeDetails);
      console.log(placeDetails);
    };
    fetchPlaces();
  }, []);

  const fetchMilestone = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/api/milestone/${selectedPlace}`
      );
      setMilestoneData(response.data);
    } catch (error) {
      console.error("Failed to fetch milestone:", error);
      setMilestoneData({ current: "Beginner", previous: null });
    }
  };

  // Update milestone when placeInfo changes
  // useEffect(() => {

  //     const newMilestone = determineMilestone(placeInfo.reviewsCount);
  //     if (newMilestone !== milestoneData.current) {
  //       updateMilestone(newMilestone);
  //     }

  // }, []);
  useEffect(() => {
    const fetchRepliedReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/api/replied-reviews`
        );
        setRepliedReviewIds(response.data);
      } catch (error) {
        console.error("Failed to fetch replied reviews:", error);
      }
    };
    fetchRepliedReviews();
  }, []);

  // Handle reply button click
  const handleReply = async (reviewId) => {
    try {
      // Send the review ID to the backend
      await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/replied-reviews`, {
        reviewId,
      });
      // Update the local state
      setRepliedReviewIds((prev) => [...prev, reviewId]);
    } catch (error) {
      console.error("Failed to mark review as replied:", error);
    }
  };
  const updateMilestone = async (newMilestone) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/api/milestone/${selectedPlace}`,
        { newMilestone }
      );

      setMilestoneData(response.data);

      // Show notification only if milestone changed
      if (response.data.current !== response.data.previous) {
        setShowMilestoneNotification(true);
      }
    } catch (error) {
      console.error("Failed to update milestone:", error);
    }
  };

  const placeOptions = {
    "simple-bar":
      "https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D",
    "complex-bar":
      "https://www.google.com/maps/place/Ice+and+Spice/@22.58638,88.150382,12z/data=!4m10!1m2!2m1!1sice+and+spice!3m6!1s0x39f89df5db8af2dd:0x82687ddd6415ff25!8m2!3d22.6160565!4d88.3874674!15sCg1pY2UgYW5kIHNwaWNlWg8iDWljZSBhbmQgc3BpY2WSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F1vxdwq3x?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D",
    "bad-bar":
      "https://www.google.com/maps/place/Techno+Main+Salt+Lake/@22.5760866,88.4251959,17z/data=!4m10!1m2!2m1!1stechno+india+main+salt+lake!3m6!1s0x3a02751a9d9c9e85:0x7fe665c781b10383!8m2!3d22.5761707!4d88.4270293!15sCht0ZWNobm8gaW5kaWEgbWFpbiBzYWx0IGxha2VaHSIbdGVjaG5vIGluZGlhIG1haW4gc2FsdCBsYWtlkgEHY29sbGVnZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOeGNuQlhlSHBSUlJBQuABAPoBBQi-AhAt!16s%2Fg%2F11fml2v54k?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
  };

  const getStartDate = (option) => {
    const today = new Date();
    switch (option) {
      case "last-7-days":
        return new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split("T")[0];
      case "last-30-days":
        return new Date(today.setDate(today.getDate() - 30))
          .toISOString()
          .split("T")[0];
      case "last-90-days":
        return new Date(today.setDate(today.getDate() - 90))
          .toISOString()
          .split("T")[0];
      default:
        return new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split("T")[0];
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
      const urlMain = placeOptions[selectedPlace];
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/api/reviews?url=${encodeURIComponent(
          urlMain
        )}&reviewsStartDate=${reviewsStartDate}`
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
      const placeData = data.simplifiedReviews.filter(
        (item) => item.type === "placeInfo"
      )[0];
      setPlaceInfo(placeData);
      setAnalysis(data.sentimentAnalysis.rawAnalysis);
      // Set reviews (excluding place info)
      const reviewsData = data.simplifiedReviews.filter(
        (review) => review.type === "placeInfo"
      );
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

      // const newMilestone = determineMilestone(placeData.reviewsCount);
      // if (newMilestone !== milestone) {
      //   await updateMilestone(newMilestone);
      // }
      const newMilestone = determineMilestone(placeData?.reviewsCount);
      if (newMilestone !== milestoneData.current) {
        updateMilestone(newMilestone);
      }

      // Filter negative reviews
      const negativeReviews = reviewsData.filter((review) => review.stars < 3);
      setNegativeReviews(negativeReviews);

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Determine milestone based on reviews count
  const determineMilestone = (reviewsCount) => {
    if (reviewsCount < 10) return "Beginner";
    if (reviewsCount < 50) return "Amateur";
    if (reviewsCount < 100) return "Challenger";
    if (reviewsCount < 500) return "Master";
    if (reviewsCount < 1000) return "Legend";
    return "Grandmaster";
  };

  const milestones = [
    {
      title: "Beginner",
      reviews: "0-9 reviews",
      minReviews: 0,
      maxReviews: 9,
      icon: "/beginner.png",
      width: "w-[141px]",
      height: "h-[158px]",
      color: "[&>div]:bg-[#9E7A4A]",
    },
    {
      title: "Amateur",
      reviews: "10-49 reviews",
      minReviews: 10,
      maxReviews: 49,
      icon: "/amateur.png",
      width: "w-[141px]",
      height: "h-[158px]",
      color: "[&>div]:bg-[#717F88]",
    },
    {
      title: "Challenger",
      reviews: "50-99 reviews",
      minReviews: 50,
      maxReviews: 99,
      icon: "/challenger.png",
      width: "w-[141px]",
      height: "h-[158px]",
      color: "[&>div]:bg-[#A56938]",
    },
    {
      title: "Master",
      reviews: "100-499 reviews",
      minReviews: 100,
      maxReviews: 499,
      icon: "/master.png",
      width: "w-[141px]",
      height: "h-[158px]",
      color: "[&>div]:bg-[#566B8A]",
    },
    {
      title: "Legend",
      reviews: "500-999 reviews",
      minReviews: 500,
      maxReviews: 999,
      icon: "/legend.png",
      width: "w-[141px]",
      height: "h-[158px]",
      color: "[&>div]:bg-[#F7BF46]",
    },
    {
      title: "Grandmaster",
      reviews: "1000+ reviews",
      minReviews: 1000,
      maxReviews: Infinity,
      icon: "/grandmaster.png",
      width: "w-[141px]",
      height: "h-[158px]",
      color: "[&>div]:bg-[#9C6AFF]",
    },
  ];

  const handleFilterClick = () => {
    setShowMilestoneNotification(false);
    setUrl(placeOptions[selectedPlace]);
    fetchMilestone();
    fetchReviews();
    setLoading(true); // Show loading state
    setError("");
  };
  useEffect(() => {
    fetchMilestone();
    fetchReviews();
  }, []);

  return (
    <FilterContext.Provider
      value={{
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
        analysis,
        milestones,
        milestone,
        previousMilestone,
        negativeReviews,
        showMilestoneNotification,
        setShowMilestoneNotification,
        milestoneData,
        places,
        handleReply,
        repliedReviewIds,
        setRepliedReviewIds,
        admin,
        isOpen,
        setIsOpen,
        toggleSidebar
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
