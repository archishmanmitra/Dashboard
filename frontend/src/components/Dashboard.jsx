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
export function Dashboard() {
  // const categorizeReviewsByMonth = (data) => {
  //   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   const monthlyCounts = new Array(12).fill(0);

  //   data.forEach((entry) => {
  //     const date = new Date(entry.publishedAtDate);
  //     const month = date.getMonth();
  //     monthlyCounts[month] += 1;
  //   });

  //   return monthNames.map((month, index) => ({
  //     month,
  //     reviews: monthlyCounts[index],
  //   }));
  // };

  // const chartData = categorizeReviewsByMonth(rawData);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [url, setUrl] = useState("https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D");
  const [selectedOption, setSelectedOption] = useState("last-7-days");
  const [selectedPlace, setSelectedPlace] = useState("simple-bar");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [posiper, setPosiper] = useState(0);
  const [negaper, setNegaper] = useState(0);
  const [chartData, setChartData] = useState([]);
  const hasFetched = useRef(false);

  const placeOptions = {
    "simple-bar": "https://www.google.com/maps/place/Techno+India+University/@22.5760026,88.4259374,17z/data=!3m1!4b1!4m6!3m5!1s0x39f970ae9a2e19b5:0x16c43b9069f4b159!8m2!3d22.5760026!4d88.4285123!16s%2Fm%2F0k3lkpp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D",
    "complex-bar": "https://www.google.com/maps/search/iem/@22.456918,88.3197996,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
    "bad-bar": "https://www.google.com/maps/place/Techno+Main+Salt+Lake/@22.5760866,88.4251959,17z/data=!4m10!1m2!2m1!1stechno+india+main+salt+lake!3m6!1s0x3a02751a9d9c9e85:0x7fe665c781b10383!8m2!3d22.5761707!4d88.4270293!15sCht0ZWNobm8gaW5kaWEgbWFpbiBzYWx0IGxha2VaHSIbdGVjaG5vIGluZGlhIG1haW4gc2FsdCBsYWtlkgEHY29sbGVnZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOeGNuQlhlSHBSUlJBQuABAPoBBQi-AhAt!16s%2Fg%2F11fml2v54k?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D",
  }

  
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

  // Function to calculate sentiment
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
    try {
      setUrl(placeOptions[selectedPlace])
      setSelectedPlace(selectedPlace)
    setSelectedOption(selectedOption)
      const reviewsStartDate = getStartDate(selectedOption);
      const url = placeOptions[selectedPlace];
      const response = await fetch(
        `http://localhost:3000/api/reviews?url=${encodeURIComponent(url)}&reviewsStartDate=${reviewsStartDate}`
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
      const placeData = data.simplifiedReviews.filter((item) => item.type === "placeInfo");
      setChartData(data.reviewsChartData)

      // Calculate sentiment
      const { positive: pos, negative: neg } = calculateSentiment(placeData);

      // Calculate percentages
      const numReview = pos + neg;
      const percP = ((pos / numReview) * 100).toFixed(2);
      const percN = ((neg / numReview) * 100).toFixed(2);

      // Update state
      setPlaceInfo(placeData);
      setPositive(pos);
      setNegative(neg);
      setPosiper(percP);
      setNegaper(percN);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchReviews();
    }
  }, []);

  const handleFilterClick = () => {
    // Trigger useEffect by updating the state
    
    setLoading(true); 
    fetchReviews();
    // setLoading(false);// Show loading state
    // setError(""); // Clear any previous errors
  };


  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            variant="outline"
            className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700 flex items-center gap-2"
          >
            <Download size={16} />
            Export Report
          </Button>
        </div>


        <div className="flex items-center justify-between">
          {/* Overview Section */}
          <div>
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="text-sm text-neutral-400">Overall weekly performance</p>
          </div>

          {/* Filters */}
          <div className="flex justify-between gap-6 items-center">
            <div className="flex gap-6">
              <div className="w-48">
                <Select value={selectedPlace}
                  onValueChange={setSelectedPlace}>
                  <SelectTrigger className="bg-neutral-800 gap-2 border-white rounded-full text-white">
                    <Calendar />
                    <SelectValue placeholder="Simple Bar" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="simple-bar">Simple Bar</SelectItem>
                    <SelectItem value="complex-bar">Complex Bar</SelectItem>
                    <SelectItem value="bad-bar">Bad Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Select
                  value={selectedOption}
                  onValueChange={(value) => {
                    console.log("Selected option:", value);
                    setSelectedOption(value);
                  }}
                >
                  <SelectTrigger className="bg-neutral-800 gap-2 border-white rounded-full text-white">
                    <Timer />
                    <SelectValue placeholder="Last 7 days" />
                  </SelectTrigger>
                  <SelectContent className='bg-white' >
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              variant="primary"
              className="bg-white border-neutral-700 rounded-full text-black hover:bg-gray-500"
              onClick={() => handleFilterClick()}
            >
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Ratings Card */}
          <Card className="bg-neutral-800 border-none text-white ">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-2 text-blue-400" />
                Total Ratings
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {placeInfo[0].reviewsCount}
              </div>
              <div className="text-xs text-neutral-400 mt-1">in a week</div>

              <div className="mt-4 h-[120px]">
                {/* Chart representation */}
                <div className="flex items-end justify-between h-full">
                  {/* {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-blue-400"
                      style={{
                        height: `${Math.random() * 70 + 10}%`,
                        borderTopLeftRadius: "2px",
                        borderTopRightRadius: "2px",
                      }}
                    />
                  ))} */}
                  <ReviewsChart data={chartData} />
                </div>
                {/* <div className="flex justify-between text-[10px] text-neutral-400 mt-2">
                  <div>Jan</div>
                  <div>Feb</div>
                  <div>Mar</div>
                  <div>Apr</div>
                  <div>May</div>
                  <div>Jun</div>
                  <div>Jul</div>
                  <div>Aug</div>
                  <div>Sep</div>
                  <div>Oct</div>
                  <div>Nov</div>
                  <div>Dec</div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Average Ratings Card */}
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-2 text-blue-400" />
                Average Ratings
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {placeInfo[0].totalScore}
              </div>
              <div className="flex items-center mt-2 text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+15% From Last Week</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Visitors Card */}
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-400" />
                Total Visitors
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">198</div>
              <div className="flex items-center mt-2 text-xs text-red-500">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>-5% From Last Week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Positive vs Negative Rating Ratio */}
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Positive vs Negative Rating Ratio
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
                    "bg-neutral-500", // background of the progress bar
                    "[&>div]:bg-green-500" // targets the inner div to color the progress indicator
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
                    "bg-neutral-500", // background of the progress bar
                    "[&>div]:bg-red-500" // targets the inner div to color the progress indicator
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Negative Review Alert */}
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Negative Review Alert
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold">{negative}</div>
              <Button
                variant="outline"
                className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
              >
                Manage
              </Button>
            </div>
            <div className="flex items-center mt-2 text-xs text-red-500">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>-50% Improved From Last Week</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
