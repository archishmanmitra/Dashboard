/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertTriangle,
  ArrowUpRight,
  Download,
  Info,
  Star,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import FilterBar from "./FilterBar";
import { useFilterContext } from "../context/FilterContext";

const ProgressLine = ({ completed, current, total = 16 }) => {
  return (
    <div className="flex items-center justify-center gap-1 w-full h-8">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`h-0.5 w-1 mx-px ${
            completed
              ? "bg-green-500"
              : current && index < Math.floor((current / 100) * (total))
              ? "bg-green-500"
              : "bg-gray-600"
          }`}
        ></div>
      ))}
    </div>
  );
};

const ProgressBadge = ({
  icon,
  title,
  reviews,
  active,
  width,
  height,
}) => {
  return (
    <div
      className={`flex flex-col items-center ${
        active ? "text-white" : "text-neutral-600"
      }`}
    >
      {/* Icon Container - Top */}
      <div
        className={`${width} ${height} mb-2 relative flex items-center justify-center overflow-hidden rounded-full bg-neutral-800`}
      >
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain p-3"
        />
      </div>

      {/* Text Content - Middle */}
      <div className="text-center mb-2">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-neutral-500">{reviews}</p>
      </div>

      {/* Checkmark Container - Fixed Height Bottom */}
      {/* <div className="h-6 mt-2.5 flex gap-3 items-center ">
        {" "}
        {completedTick ? (
          <div className="bg-green-500 text-neutral-800 rounded-full p-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
        ) : (
          <div className="bg-[#292C30] text-white rounded-full p-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div> // Empty spacer
        )}
        {ticked && (
          <ProgressLine
            completed={completed}
            current={
             isCurrent
            }
          />
        )}
      </div> */}
    </div>
  );
};
const ProgressIndicator = ({
  completed,
  isCurrent,
  completedTick,
  showLine
}) => {
  return (
    <div className="flex items-center px-1 gap-2">
      {/* Checkmark */}
      {completedTick ? (
        <div className="bg-green-500 text-neutral-800 rounded-full p-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        </div>
      ) : (
        <div className="bg-[#292C30] text-white rounded-full p-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        </div>
      )}
      
      {/* Progress Line */}
      {showLine && (
        <ProgressLine
          completed={completed}
          current={isCurrent}
        />
      )}
    </div>
  );
};

// Component to be used in the Performance component
const ProgressSection = ({ milestones, currentMilestone, reviewsCount }) => {
  // Calculate the current progress within a milestone
  const getCurrentLevelProgress = (count) => {
    const currentMilestoneObj = milestones.find(
      (m) => m.title === currentMilestone
    );
    if (!currentMilestoneObj) return 0;

    const range =
      currentMilestoneObj.maxReviews - currentMilestoneObj.minReviews;
    const progress = count - currentMilestoneObj.minReviews;

    return Math.min(100, (progress / range) * 100);
  };

  return (
    <div className="flex flex-col">
      {/* Badges row */}
      <div className="flex items-center justify-between px-6 mb-8">
        {milestones.map((milestone, index) => (
          <div key={`badge-${index}`}>
            <ProgressBadge
              width={milestone.width}
              height={milestone.height}
              icon={milestone.icon}
              title={milestone.title}
              reviews={milestone.reviews}
              active={currentMilestone === milestone.title}
            />
          </div>
        ))}
      </div>
      
      {/* Progress indicators row - now separate from badges */}
      <div className="flex items-center justify-between pl-19 pr-20 px-6">
        {milestones.map((milestone, index) => (
          <div key={`progress-${index}`} className="flex-1 flex justify-center">
            <ProgressIndicator
              completed={reviewsCount > milestone.maxReviews}
              completedTick={reviewsCount >= milestone.minReviews}
              isCurrent={
                reviewsCount >= milestone.minReviews && 
                reviewsCount <= milestone.maxReviews ? 
                  getCurrentLevelProgress(reviewsCount) : 0
              }
              showLine={index < milestones.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Performance() {
  const {
    placeInfo,
    loading,
    error,
    fetchReviews,
    determineMilestone,
    click,
    counts,
    clickRate,
    countRate,
  } = useFilterContext();

  // useEffect(() => {
  //   if (performance.navigation.type === 1) {  // 1 = Reload, 0 = Normal navigation
  //     fetchReviews();
  //   };
  // }, []);

  if (loading) return <p className="...">Loading performance...</p>;
  if (error) return <p className="...">Error...</p>;
  
  // Add null check for placeInfo
  if (!placeInfo) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No performance data available.
      </p>
    );
  }

  // Milestone calculation
  const currentMilestone = placeInfo
    ? determineMilestone(placeInfo.reviewsCount)
    : "Beginner";
  const milestones = [
    {
      title: "Beginner",
      reviews: "0-9 reviews",
      minReviews: 0,
      maxReviews: 9,
      icon: "/beginner.png",
      width: "w-[141px]",
      height: "h-[158px]",
    },
    {
      title: "Amateur",
      reviews: "10-49 reviews",
      minReviews: 10,
      maxReviews: 49,
      icon: "/amateur.png",
      width: "w-[141px]",
      height: "h-[158px]",
    },
    {
      title: "Challenger",
      reviews: "50-99 reviews",
      minReviews: 50,
      maxReviews: 99,
      icon: "/challenger.png",
      width: "w-[141px]",
      height: "h-[158px]",
    },
    {
      title: "Master",
      reviews: "100-499 reviews",
      minReviews: 100,
      maxReviews: 499,
      icon: "/master.png",
      width: "w-[141px]",
      height: "h-[158px]",
    },
    {
      title: "Legend",
      reviews: "500-999 reviews",
      minReviews: 500,
      maxReviews: 999,
      icon: "/legend.png",
      width: "w-[141px]",
      height: "h-[158px]",
    },
    {
      title: "Grandmaster",
      reviews: "1000+ reviews",
      minReviews: 1000,
      maxReviews: Infinity,
      icon: "/grandmaster.png",
      width: "w-[141px]",
      height: "h-[158px]",
    },
  ];
  // Calculate the current progress within a milestone
  const getCurrentLevelProgress = (count) => {
    const currentMilestoneObj = milestones.find(
      (m) => m.title === currentMilestone
    );
    if (!currentMilestoneObj) return 0;

    const range =
      currentMilestoneObj.maxReviews - currentMilestoneObj.minReviews;
    const progress = count - currentMilestoneObj.minReviews;

    return Math.min(100, (progress / range) * 100);
  };

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
            <h2 className="text-xl text-white">Performance</h2>
            <p className="text-neutral-400">Monitor your software performance</p>
          </div>

          {/* Filters */}
          <FilterBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before/After Star Boom */}
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Before Star Boom and After Star Boom
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-neutral-400">Before</p>
                  <h2 className="text-4xl font-bold">6</h2>
                  <p className="text-xs text-neutral-400">
                    reviews & average of 4.2 Stars
                  </p>
                </div>
                <div className="text-lg font-medium">vs</div>
                <div className="text-center">
                  <p className="text-sm text-green-400">After</p>
                  <h2 className="text-4xl font-bold">
                    {placeInfo ? placeInfo.reviewsCount : "N/A"}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    reviews & average of{" "}
                    {placeInfo ? placeInfo.totalScore : "N/A"} Stars
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competitor Benchmarking */}
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Competitor Benchmarking
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-green-400">Your business</p>
                  <h2 className="text-4xl font-bold">
                    {placeInfo ? placeInfo.reviewsCount : "N/A"}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    reviews & average of{" "}
                    {placeInfo ? placeInfo.totalScore : "N/A"} Stars
                  </p>
                </div>
                <div className="text-lg font-medium">vs</div>
                <div className="text-center">
                  <p className="text-sm text-neutral-400">Salt paper</p>
                  <h2 className="text-4xl font-bold">10</h2>
                  <p className="text-xs text-neutral-400">
                    reviews & average of 4.5 Stars
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-neutral-800 border-none mt-5 mb-5 text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Your Progress
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            {/* Using our new separated progress component */}
            <ProgressSection 
              milestones={milestones}
              currentMilestone={currentMilestone}
              reviewsCount={placeInfo.reviewsCount}
            />
          </CardContent>
        </Card>

        <div className="flex gap-5 items-center">
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  Visitors
                </div>
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold">{counts}</div>
                <Button
                  variant="outline"
                  className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                >
                  Manage
                </Button>
              </div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+{countRate} % improved from last week</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-800 border-none text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  Button Clicks
                </div>
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold">{click}</div>
                <Button
                  variant="outline"
                  className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
                >
                  Manage
                </Button>
              </div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+{clickRate} % improved from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
