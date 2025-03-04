import React, { useState, useEffect } from 'react';
import {
  Star,
  Info,
  Users,
  AlertTriangle,
  Download,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
  // const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [posiper, setPosiper] = useState(0);
  const [negaper, setNegaper] = useState(0);

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
        const calculateSentiment = (reviews) => {
          let positive = 0;
          let negative = 0;


          reviews.forEach(review => {
            if (review.stars >= 3) {
              positive++;
            } else {
              negative++;
            }
          }
          );
          return {positive, negative}
        }
        setPlaceInfo(placeData);
        const obj= calculateSentiment(placeData);
        setPositive(obj.positive);
        setNegative(obj.negative);
        const numReview= placeData[0].reviewsCount;
        const percP = (obj.positive / numReview) * 100;
        const percN = (obj.negative / numReview) * 100;
        setPosiper(percP);
        setNegaper(percN);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading reviews...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700 flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>

        {/* Overview Section */}
        <div>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-sm text-neutral-400">Overall weekly performance</p>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-48">
              <Select defaultValue="simple-bar">
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Simple Bar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple-bar">Simple Bar</SelectItem>
                  <SelectItem value="other-option">Other Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Select defaultValue="last-7-days">
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Last 7 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
            Filter
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Ratings Card */}
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-2 text-blue-400" />
                Total Ratings
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{placeInfo[0].reviewsCount}</div>
              <div className="text-xs text-neutral-400 mt-1">in a week</div>

              <div className="mt-4 h-[120px]">
                {/* Chart representation */}
                <div className="flex items-end justify-between h-full gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full bg-blue-400"
                      style={{
                        height: `${Math.random() * 70 + 10}%`,
                        borderTopLeftRadius: '2px',
                        borderTopRightRadius: '2px'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 mt-2">
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
                </div>
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
              <div className="text-4xl font-bold">{placeInfo[0].totalScore}</div>
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
                <Progress value={posiper} className="h-2 bg-neutral-700 text-green-500"  />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Negative Review</span>
                  <span className="text-sm">{negaper}%</span>
                </div>
                <Progress value={30} className="h-2 bg-neutral-700" indicatorClassName="bg-red-500" />
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
              <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
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