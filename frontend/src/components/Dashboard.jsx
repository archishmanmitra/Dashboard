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
import { Separator } from "./ui/separator";
import { Icon } from "@iconify/react";


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
    negative,
    determineMilestone,
    milestones
  } = useFilterContext()

  const getCurrentLevelProgress = (count, currentMilestoneObj) => {

    const range =
      currentMilestoneObj.maxReviews - currentMilestoneObj.minReviews;
    const progress = count - currentMilestoneObj.minReviews;

    return Math.min(100, (progress / range) * 100);
  };
  const currentMilestone = placeInfo
    ? determineMilestone(placeInfo.reviewsCount)
    : "Beginner";
  const currentMilestoneObj = milestones.find(
    (m) => m.title === currentMilestone
  );

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  const [ina, setIna] = useState('a week');
  return (
    <div className="min-h-screen relative bg-black p-6">
      {/* Header */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "542px",
          height: "530px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(67, 133, 255, 0.26) 0%, rgba(0, 0, 0, 0) 70%)",
          zIndex: "0",
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl  text-white">Dashboard</h1>
          </div>
          {/* <Button
          variant="outline"
          className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button> */}
        </div>
        <Separator className="my-4 bg-neutral-800" />

        {/* Overview Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-white">Overview</h2>
              <p className="text-neutral-400 text-xs">Overall weekly performance</p>
            </div>

            <FilterBar />
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3  gap-4">
            {/* Total Ratings */}
            <div className="lg:col-span-2 ">
              <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center">
                      <Icon icon="mdi:sparkles" width="24" height="24" className="mr-2" />
                      <h1 className="text-lg">Total Ratings</h1>
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
                  <ReviewsChart />
                  {/* </div> */}
                  {/* </div> */}
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
              <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 row-span-1 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-11">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center">
                      {/* <Star className="h-4 w-4 mr-2 text-blue-400" /> */}
                      <Icon icon="material-symbols:star-rounded" width="24" height="24" className="mr-2" />
                      <h1 className="text-lg">Average Ratings</h1>
                    </div>
                  </CardTitle>
                  <Info className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {placeInfo ? placeInfo.totalScore : 'N/A'}
                  </div>
                  <div className="flex items-center mt-2 text-xs text-green-500">
                  {/* <ArrowUpRight className="h-3 w-3 mr-1" /> */}
                  <span>in {selectedOption === "last-90-days"
            ? " 3 months"
            : selectedOption === "last-30-days"
            ? " a month"
            : " a week"}</span>
                </div>
                  {/* <div className="h-4"></div> */}
                </CardContent>
              </Card>

              <Card className="bg-custom-gradient border border-[var(--color-bodcol)] row-span-1 z-10 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-11">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center">
                      <Icon icon="mdi:people" width="24" height="24" className="mr-2" />
                      <h1 className="text-lg">Total Reviews Earned</h1>

                    </div>
                  </CardTitle>
                  <Info className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{placeInfo ? placeInfo.reviewsCount : 'N/A'}</div>
                  {/* <div className="flex items-center mt-2 text-xs text-red-500">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>-5% reduced from last week</span>
                </div> */}
                  <div className="h-4"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-4">
            {/* Positive vs Negative Rating Ratio */}
            <Card className="bg-custom-gradient border  border-[var(--color-bodcol)] z-10 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                  <Icon icon="ix:compare" width="24" height="24" className="mr-2 rotate-90" />
                  <h1 className="text-lg">Positive vs Negative Rating Ratio</h1>
                    
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
            <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                  <Icon icon="material-symbols:trophy" width="24" height="24" className="mr-2" />
                  <h1 className="text-lg">Milestone</h1>
                  </div>
                </CardTitle>
                <Info className="h-4 w-4 text-neutral-500" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-evenly items-center w-full">
                    <div className="w-16 h-16  rounded-full flex items-center justify-center mb-3">
                      {currentMilestoneObj && (
                        <img src={currentMilestoneObj.icon} alt="milestone" />)}
                    </div>
                    <div className="flex-col flex items-start justify-center">
                      <h3 className="text-lg font-semibold mb-1">{currentMilestoneObj.title}</h3>
                      <p className="text-sm text-neutral-400 mb-3">{currentMilestoneObj.minReviews} stars completed!</p>

                    </div>

                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2 mb-2">
                    {milestones[milestones.indexOf(currentMilestoneObj) + 1] ? (
                      <Progress
                        value={getCurrentLevelProgress(placeInfo.reviewsCount, currentMilestoneObj)}
                        className={cn(
                          "h-2",
                          "bg-neutral-700",
                          "[&>div]:bg-red-500"
                        )}
                      />

                    ) : (
                      <Progress
                        value={100}
                        className={cn(
                          "h-2",
                          "bg-neutral-700",
                          "[&>div]:bg-red-500"
                        )}
                      />
                    )}
                  </div>
                  <p className="text-xs text-neutral-400">
                    {milestones[milestones.indexOf(currentMilestoneObj) + 1] ? (
                      `Earn ${milestones[milestones.indexOf(currentMilestoneObj) + 1].minReviews - placeInfo.reviewsCount} more stars to become a ${milestones[milestones.indexOf(currentMilestoneObj) + 1].title}`
                    ) : (
                      "No next milestone available"
                    )
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Negative Review Alert */}
            <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
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
                  <div className="text-4xl font-bold">{negative}</div>
                  <Button
                    variant="outline"
                    className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                  >
                    Manage
                  </Button>
                </div>
                {/* <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+15% improved from last week</span>
            </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;