/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Info,
  Star,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import FilterBar from "./FilterBar";
import { useFilterContext } from "../context/FilterContext";
import { Separator } from "./ui/separator";
import { Icon } from "@iconify/react";
import Loader from "./Loader";

const ProgressLine = ({ completed, current, totalSegments = 16 }) => {
  const [total, setTotal] = React.useState(totalSegments || 16);
    useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Adjust number of segments based on screen width
      if (width < 640) {
        setTotal(8); // fewer segments on mobile
      } else if (width < 1024) {
        setTotal(12);
         // medium number on tablets
      }
      else if(width < 1250){
        setTotal(11)
      }
       else {
        setTotal( 18); // full amount on desktop
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [totalSegments]);
  return (
    <div className="flex md:flex-row flex-col items-center justify-center gap-1 w-full h-8">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className={`h-0.5 md:w-[3px] flex-grow  mx-px ${completed
            ? "bg-[var(--color-green)]"
            : current && index < Math.floor((current / 100) * (total))
              ? "bg-[var(--color-green)]"
              : "bg-[var(--color-bodcol)]"
            }`}
        ></div>
      ))}
    </div>
  );
};

const ProgressBadge = ({ icon, title, reviews, active, width, height }) => {
  const [dimensions, setDimensions] = React.useState({
    width: "w-[141px]",
    height: "h-[158px]",
    padding: "p-3",
    textSize: "text-sm",
    reviewSize: "text-xs",
    margin: "mb-2"
  });
  
  // Effect to update dimensions based on window width
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        // Extra small screens
        setDimensions({
          width: "w-[80px]",
          height: "h-[90px]",
          padding: "p-1",
          textSize: "text-xs",
          reviewSize: "text-[10px]",
          margin: "mb-1"
        });
      } else if (width < 640) {
        // Small screens
        setDimensions({
          width: "w-[100px]",
          height: "h-[110px]",
          padding: "p-1.5",
          textSize: "text-xs",
          reviewSize: "text-xs",
          margin: "mb-1"
        });
      } else if (width < 768) {
        // Medium-small screens
        setDimensions({
          width: "w-[120px]",
          height: "h-[130px]",
          padding: "p-2",
          textSize: "text-sm",
          reviewSize: "text-xs",
          margin: "mb-1.5"
        });
      } else if (width < 1024) {
        // Medium screens
        setDimensions({
          width: "w-[130px]",
          height: "h-[145px]",
          padding: "p-2.5",
          textSize: "text-sm",
          reviewSize: "text-xs",
          margin: "mb-2"
        });
      } else if (width < 1224) {
        // Medium screens
        setDimensions({
          width: "w-[130px]",
          height: "h-[145px]",
          padding: "p-2.5",
          textSize: "text-sm",
          reviewSize: "text-xs",
          margin: "mb-2"
        });
      }
       else {
        // Large screens
        setDimensions({
          width: "w-[141px]",
          height: "h-[158px]",
          padding: "p-3",
          textSize: "text-sm",
          reviewSize: "text-xs",
          margin: "mb-2"
        });
      }
    };
    
    // Set initial dimensions
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div
      className={`flex md:flex-col  items-center ${active ? "text-white" : "text-neutral-600"
        }`}
    >
      {/* Icon Container - Top */}
      <div
        className={`${dimensions.width} ${dimensions.height} ${dimensions.margin} mb-2  relative flex items-center justify-center overflow-hidden rounded-full bg-none`}
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
  showLine,
}) => {
  return (
    <div className="flex md:flex-row flex-col items-center px-1 gap-2">
      {/* Checkmark */}
      {completedTick ? (
        <div className="bg-[var(--color-green)] text-[var(--color-in-tick)] rounded-full p-1">
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
        <div className="bg-[var(--color-eclipse)] text-[var(--color-in-tick)] rounded-full p-1">
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
      {showLine && <ProgressLine completed={completed} current={isCurrent} />}
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
    <div className="flex  flex-col ">
      {/* Badges row */}
      <div className="md:flex hidden flex-col md:flex-row items-center justify-between px-6 mb-8">
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
      <div className="md:flex hidden items-center justify-between pl-19 pr-24 px-6">
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
      {/* Mobile view - vertical layout */}

      <div className="flex flex-col md:hidden w-full">
        {milestones.map((milestone, index) => (
          <div
            key={`mobile-progress-${index}`}
            className="flex items-center mb-8 relative"
          >
            <div className="flex">
              {/* Badge and progress circle container */}
              <div className="flex gap-4  ml-0 items-center justify-between">
                {/* Badge icon first */}
                <ProgressBadge
                  width='w-[111px]'
                  height='h-[128px]'
                  icon={milestone.icon}
                  active={currentMilestone === milestone.title}
                />

                {/* Progress circle after badge */}
                <div className="mt-6">
                  <div
                    className={`left-1/2 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 rounded-full flex items-center justify-center z-10
              ${reviewsCount > milestone.maxReviews
                        ? "bg-[var(--color-green)]"
                        : currentMilestone === milestone.title
                          ? "bg-[var(--color-green)]"
                          : "bg-[var(--color-eclipse)]"
                      }`}
                  >
                    {reviewsCount && (
                      <div className=" text-[var(--color-in-tick)]">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        // className="text-[var(--color-in-tick)]"
                        >
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </div>
                    )}

                    {/* Vertical dotted line between badge and text */}
                    {index < milestones.length - 1 && (
                      <div className="absolute mt-2 left-1/2 top-full flex flex-col gap-2">
                        {[...Array(8)].map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`h-2 w-1 rounded-full
                    ${reviewsCount > milestone.maxReviews
                                ? "bg-[var(--color-green)]"
                                : "bg-[var(--color-bodcol)]"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
              <div className="ml-3 mt-11">
                <div className="font-medium text-sm">{milestone.title}</div>
                <div className="text-xs text-gray-500">
                  {milestone.reviews}
                </div>
              </div>
            </div>
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
    milestone,
    places,
    toggleSidebar,
    redOrGreen,
    redOrGreenScan
  } = useFilterContext();

  // useEffect(() => {
  //   if (performance.navigation.type === 1) {  // 1 = Reload, 0 = Normal navigation
  //     fetchReviews();
  //   };
  // }, []);

  if (loading) return <Loader />;
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
  const milestonesMobile = [
    {
      title: "Beginner",
      reviews: "0-9 reviews",
      minReviews: 0,
      maxReviews: 9,
      icon: "/beginner.png",
      width: "w-[96px]",
      height: "h-[113px]",
    },
    {
      title: "Amateur",
      reviews: "10-49 reviews",
      minReviews: 10,
      maxReviews: 49,
      icon: "/amateur.png",
      width: "w-[96px]",
      height: "h-[113px]",
    },
    {
      title: "Challenger",
      reviews: "50-99 reviews",
      minReviews: 50,
      maxReviews: 99,
      icon: "/challenger.png",
      width: "w-[96px]",
      height: "h-[113px]",
    },
    {
      title: "Master",
      reviews: "100-499 reviews",
      minReviews: 100,
      maxReviews: 499,
      icon: "/master.png",
      width: "w-[96px]",
      height: "h-[113px]",
    },
    {
      title: "Legend",
      reviews: "500-999 reviews",
      minReviews: 500,
      maxReviews: 999,
      icon: "/legend.png",
      width: "w-[96px]",
      height: "h-[113px]",
    },
    {
      title: "Grandmaster",
      reviews: "1000+ reviews",
      minReviews: 1000,
      maxReviews: Infinity,
      icon: "/grandmaster.png",
      width: "w-[96px]",
      height: "h-[113px]",
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
    <div className="min-h-screen relative bg-black p-6 px-8">
      {/* Header */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "542px",
          height: "530px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(67, 133, 255, 0.26) 0%, rgba(0, 0, 0, 0) 70%)",
          zIndex: "0",
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between md:mb-4.5">
          <div className="flex items-center w-full lg:w-auto justify-between ">
            <h1 className="text-4xl hidden lg:block text-white">Dashboard</h1>
            <div className="flex items-center justify-between w-full ">
              <img src="/starboom.png" alt="logo" className="lg:hidden block h-14 w-12" />
              <Icon
                icon="tabler:menu-deep"
                width="32"
                height="32"
                className="text-white lg:hidden block z-40"
                onClick={toggleSidebar}
              />
            </div>
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
        <div className="mb-8 mt-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-8">
            <div className="gap-2 flex flex-col">
              <h2 className="text-2xl text-white">Performance</h2>
              <p className="text-neutral-400 text-xs">
                Monitor your software performance
              </p>
            </div>

            {/* Filters */}
            <FilterBar />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            {/* Before/After Star Boom */}
            <Card className="bg-custom-gradient border border-[var(--color-bodcol)] text-white">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-sm font-medium flex items-center">
                  <div className="flex items-center">
                    <Icon
                      icon="tdesign:rocket-filled"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    <h1 className="text-lg">
                      Before and After Star Boom
                    </h1>
                  </div>
                </CardTitle>
                <Info className="h-4 w-4 text-neutral-500" />
              </CardHeader>
              <CardContent>
                <div className="flex-col md:flex-row flex  items-start  pt-6 justify-between mt-2 md:items-center gap-4">
                  <div className=" flex flex-col items-start">
                    <p className="text-sm mb-2 text-neutral-400">Before</p>
                    <div className="flex gap-2 items-end">
                      <h2 className="text-4xl font-bold">6</h2>
                      <p className="text-xs mb-1 text-neutral-400">
                        reviews & average <br /> of 4.2 Stars
                      </p>
                    </div>
                  </div>

                  <div className="text-lg font-medium">vs</div>

                  <div className="flex flex-col items-start">
                    <p className="text-sm mb-2 text-[var(--color-green)]">
                      After
                    </p>
                    <div className="flex gap-2 items-end">
                      <h2 className="text-4xl font-bold">
                        {placeInfo ? placeInfo.reviewsCount - 6 : "N/A"}
                      </h2>
                      <p className="text-xs mb-1 text-neutral-400">
                        reviews & average <br /> of{" "}
                        {placeInfo ? placeInfo.totalScore : "N/A"} Stars
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Icon
                          icon="mdi:people"
                          width="24"
                          height="24"
                          className="mr-2"
                        />
                        <h1 className="text-lg">Total Visitors</h1>
                      </div>
                    </div>
                  </CardTitle>
                  <Info className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-start mt-2 justify-between gap-5 ">
                    <div className="text-4xl mt-2 font-bold">{counts}</div>

                    <div className={`flex items-center mt-2 text-[10px] ${redOrGreenScan ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'} `}>
                      {redOrGreenScan ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownLeft className="h-3 w-3 mr-1" />}
                      
                      {countRate} %
                      <span className="text-white ml-1"> {redOrGreenScan? 'improved' : 'decreased'} from last week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Icon
                          icon="mdi:cursor-default-click"
                          width="24"
                          height="24"
                          className="mr-2"
                        />
                        <h1 className="text-lg">Total Clicks</h1>
                      </div>
                    </div>
                  </CardTitle>
                  <Info className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-start mt-2 justify-between gap-5">
                    <div className="text-4xl mt-2 font-bold">{click}</div>

                    <div className={`flex items-center text-[10px] mt-2 ${redOrGreenScan ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'} `}>
                    {redOrGreen ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownLeft className="h-3 w-3 mr-1" />}
                      {clickRate} %
                      <span className="text-white ml-1"> {redOrGreen? 'improved' : 'decreased'} from last week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-custom-gradient border border-[var(--color-bodcol)]  mt-4 mb-4 text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <div className="flex items-center">
                  <Icon
                    icon="streamline:star-badge-solid"
                    width="24"
                    height="24"
                    className="mr-2"
                  />
                  <h1 className="text-lg">Your Progress</h1>
                </div>
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent className="">
              {/* Using our new separated progress component */}
              <ProgressSection
                milestones={milestones}
                currentMilestone={currentMilestone}
                reviewsCount={placeInfo.reviewsCount}
              />
            </CardContent>
          </Card>

          {/* Competitor Benchmarking */}
          <Card className="bg-custom-gradient border border-[var(--color-bodcol)] text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <div className="flex items-center">
                  <Icon
                    icon="tabler:vs"
                    width="24"
                    height="24"
                    className="mr-2"
                  />
                  <h1 className="text-lg">Competitor Benchmarking</h1>
                </div>
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="flex-col md:flex-row flex pt-6 gap-5 items-start justify-between mt-2 md:items-center">
                <div className="flex flex-col items-start">
                  <p className="text-sm mb-2 text-[var(--color-green)]">
                    Your business
                  </p>
                  <div className="flex gap-2 items-end">
                    <h2 className="text-4xl font-bold">
                      {placeInfo ? placeInfo.reviewsCount : "N/A"}
                    </h2>
                    <p className="text-xs mb-1 text-neutral-400">
                      reviews & average <br /> of{" "}
                      {placeInfo ? placeInfo.totalScore : "N/A"} Stars
                    </p>
                  </div>
                </div>
                {places.map((place, index) => (
                  <React.Fragment key={index}>
                    <div className="text-lg font-medium">vs</div>
                    <div className="flex flex-col items-start">
                      <p className="text-sm mb-2 text-neutral-400">
                        {place.placeName}
                      </p>
                      <div className="flex gap-2 items-end">
                        <h2 className="text-4xl font-bold">
                          {place.details.user_ratings_total}
                        </h2>
                        <p className="text-xs mb-1 text-neutral-400">
                          reviews & average <br /> of {place.details.rating}{" "}
                          Stars
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}