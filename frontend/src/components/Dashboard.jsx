/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Info,
  Users,
  AlertTriangle,
  Download,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Store,
  Timer,
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "../lib/utils";
import ReviewsChart from "./ReviewChart";
import { useFilterContext } from "../context/FilterContext";
import FilterBar from "./FilterBar";

export function Dashboard() {

  const {
      selectedOption,
      placeInfo,
      loading,
      error,
      fetchReviews,
      chartData,
      posiper,
      negaper,
      negative
  } = useFilterContext()

  // const [placeInfo, setPlaceInfo] = useState(null);
  // const [url, setUrl] = useState(
  //   "https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
  // );
  // const [selectedOption, setSelectedOption] = useState("last-7-days");
  // const [selectedPlace, setSelectedPlace] = useState("simple-bar");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [positive, setPositive] = useState(0);
  // const [negative, setNegative] = useState(0);
  // const [posiper, setPosiper] = useState(0);
  // const [negaper, setNegaper] = useState(0);
  // const [chartData, setChartData] = useState([]);
  // const hasFetched = useRef(false);

  // const placeOptions = {
  //   "simple-bar":
  //     "https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D",
  //   "complex-bar":
  //     "https://www.google.com/maps/search/iem/@22.456918,88.3197996,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
  //   "bad-bar":
  //     "https://www.google.com/maps/place/Techno+Main+Salt+Lake/@22.5760866,88.4251959,17z/data=!4m10!1m2!2m1!1stechno+india+main+salt+lake!3m6!1s0x3a02751a9d9c9e85:0x7fe665c781b10383!8m2!3d22.5761707!4d88.4270293!15sCht0ZWNobm8gaW5kaWEgbWFpbiBzYWx0IGxha2VaHSIbdGVjaG5vIGluZGlhIG1haW4gc2FsdCBsYWtlkgEHY29sbGVnZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOeGNuQlhlSHBSUlJBQuABAPoBBQi-AhAt!16s%2Fg%2F11fml2v54k?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
  // };

  // const getStartDate = (option) => {
  //   const today = new Date();
  //   switch (option) {
  //     case "last-7-days":
  //       return new Date(today.setDate(today.getDate() - 7))
  //         .toISOString()
  //         .split("T")[0];
  //     case "last-30-days":
  //       return new Date(today.setDate(today.getDate() - 30))
  //         .toISOString()
  //         .split("T")[0];
  //     case "last-90-days":
  //       return new Date(today.setDate(today.getDate() - 90))
  //         .toISOString()
  //         .split("T")[0];
  //     default:
  //       return new Date(today.setDate(today.getDate() - 7))
  //         .toISOString()
  //         .split("T")[0];
  //   }
  // };

  // const calculateSentiment = (reviews) => {
  //   let positive = 0;
  //   let negative = 0;

  //   reviews.forEach((review) => {
  //     if (review.stars >= 3) {
  //       positive++;
  //     } else {
  //       negative++;
  //     }
  //   });

  //   return { positive, negative };
  // };  
  // const fetchReviews = async () => {
  //   try {
  //     setUrl(placeOptions[selectedPlace]);
  //     setSelectedPlace(selectedPlace);
  //     setSelectedOption(selectedOption);
  //     const reviewsStartDate = getStartDate(selectedOption);
  //     const url = placeOptions[selectedPlace];
  //     const response = await fetch(
  //       `http://localhost:3000/api/reviews?url=${encodeURIComponent(
  //         url
  //       )}&reviewsStartDate=${reviewsStartDate}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch reviews");
  //     }
  //     const contentType = response.headers.get("content-type");
  //     if (!contentType || !contentType.includes("application/json")) {
  //       throw new Error("Invalid response format: Expected JSON");
  //     }
  //     const data = await response.json();

  //     const placeData = data.simplifiedReviews.filter(
  //       (item) => item.type === "placeInfo"
  //     );
  //     setChartData(data.reviewsChartData);

  //     const { positive: pos, negative: neg } = calculateSentiment(placeData);

  //     const numReview = pos + neg;
  //     const percP = ((pos / numReview) * 100).toFixed(0);
  //     const percN = ((neg / numReview) * 100).toFixed(0);

  //     setPlaceInfo(placeData);
  //     setPositive(pos);
  //     setNegative(neg);
  //     setPosiper(percP);
  //     setNegaper(percN);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };
  // const [bool, setBool] = useState(false)

  useEffect(() => {

      fetchReviews();

    
  }, []);

  // const handleFilterClick = () => {
  //   setLoading(true);
  //   fetchReviews();
  // };

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-neutral-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 text-white" />
          <h1 className="text-2xl font-bold text-white">Star Boom</h1>
        </div>
        <Button
          variant="outline"
          className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl text-white">Overview</h2>
            <p className="text-neutral-400">Overall weekly performance</p>
          </div>

          <FilterBar/>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Total Ratings */}
          <div className="lg:col-span-2">
            <Card className="bg-neutral-800 border-none text-white h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-blue-400" />
                    Total Ratings
                  </div>
                </CardTitle>
                <Info className="h-4 w-4 text-neutral-500" />
              </CardHeader>
              <CardContent className=''>
                {/* <div>
                <div className="text-3xl  font-bold mb-1">
                  {placeInfo[0].reviewsCount}
                </div> */}
                {/* <div className="text-sm text-neutral-400 mb-6">in a week</div>
                <div className="h-[200px]"> */}
                  <ReviewsChart   />
                  {/* </div> */}
                {/* </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <Card className="bg-neutral-800 border-none text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-11">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-blue-400" />
                    Average Ratings
                  </div>
                </CardTitle>
                <Info className="h-4 w-4 text-neutral-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {placeInfo ? placeInfo.totalScore : 'N/A'}
                </div>
                <div className="flex items-center mt-2 text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+15% improvement from before</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 border-none text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-11">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-400" />
                    Total Reviews Earned
                  </div>
                </CardTitle>
                <Info className="h-4 w-4 text-neutral-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{placeInfo ? placeInfo.reviewsCount : 'N/A'}</div>
                <div className="flex items-center mt-2 text-xs text-red-500">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>-5% reduced from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Positive vs Negative Rating Ratio */}
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-blue-400" />
                Positive vs Negative Rating Ratio
              </div>
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Positive Review</span>
                  <span className="text-sm">{posiper}%</span>
                </div>
                <Progress
                  value={posiper}
                  className={cn(
                    "h-2",
                    "bg-neutral-700",
                    "[&>div]:bg-green-500"
                  )}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Negative Review</span>
                  <span className="text-sm">{negaper}%</span>
                </div>
                <Progress
                  value={negaper}
                  className={cn(
                    "h-2",
                    "bg-neutral-700",
                    "[&>div]:bg-red-500"
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestone */}
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
                Milestone
              </div>
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mb-3">
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Golden Seller</h3>
              <p className="text-sm text-neutral-400 mb-3">500 stars completed!</p>
              <div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-xs text-neutral-400">
                54 more stars to become a Diamond seller
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Negative Review Alert */}
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Negative Review Alert
              </div>
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold">{negative}</div>
              <Button
                variant="outline"
                className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
              >
                Manage
              </Button>
            </div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+15% improved from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;