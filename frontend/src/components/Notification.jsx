import React from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Download, Info, Star, Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import FilterBar from "./FilterBar";
import { useFilterContext } from "../context/FilterContext";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";
import Loader from "./Loader";
import { Icon } from "@iconify/react";

const Message = ({ initial, content, link, color, title, icon }) => {
  return (
    <div className="flex flex-1 gap-4 py-4  border-b border-neutral-800 last:border-0">
      <div
        className={`w-12 h-12 md:w-15 md:h-15 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {icon ? (
          <Icon icon={icon} width="28" height="28" className="" />
        ) : (
          <Icon
            icon="material-symbols:trophy-sharp"
            width="28"
            height="28"
            className=""
          />
        )}
      </div>
      <div className="flex-1 flex-col">
        <p className="text-md text-neutral-300 ">{title}</p>
        <span className="text-xs text-neutral-500 pr-4">{content}</span>
      </div>
      {/* <Button
        variant="outline"
        className="w-[95px] h-[32px] rounded-[32px] bg-white border border-neutral-700 mt-1 text-black hover:bg-neutral-700 hover:text-white transition-colors"
        style={{ lineHeight: "32px" }}
        onClick={() => window.open(link, "_blank")}
      >
        Reply
      </Button> */}
    </div>
  );
};

const Review = ({
  initial,
  author,
  rating,
  content,
  link,
  color,
  onReply,
  hasReplied,
}) => {
  return (
    <div className="flex gap-4 py-4 md:items-center items-start border-b border-neutral-800 last:border-0">
      <div
        className={`w-12 h-12 md:w-15 md:h-15  rounded-full flex items-center justify-center  text-white ${hasReplied ? "bg-green-500" : color}`}
      >
        {hasReplied ? (
          <Icon
            icon="mdi:tick-all"
            width="24"
            height="24"
            className=""
          />
        ) : (

          <Icon
            icon="ant-design:alert-filled"
            width="28"
            height="28"
            className=""
          />
        )}
      </div>
      <div className="flex-1 flex-col">
        <div className="flex justify-start gap-4 items-center mb-1">
          <p className="text-md text-neutral-300">{author}</p>
          <div className="flex mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  "text-transparent",
                  i < rating
                    ? rating > 3
                      ? "fill-[#1EC928]"
                      : rating === 3
                        ? "fill-[#F7C73B]"
                        : "fill-[#FF3838]"
                    : "fill-[#393939]"
                )}
              />
            ))}
          </div>
          {/* {hasReplied && <div>replied</div>} */}
        </div>
        <div className="flex flex-col items-start justify-between md:flex-row  mt-2 md:gap-0 gap-3 ">
          <div className="text-xs text-neutral-500 pr-4">{content}</div>
          <div className="">
            <Button
              variant="outline"
              className={`w-[75px] h-[40px] md:hidden rounded-full  ${hasReplied
                ? "bg-custom text-white border-white"
                : "bg-white border-neutral-700 text-black"
                } text-xs font-bold hover:bg-neutral-700 hover:text-white transition-colors`}
              style={{ lineHeight: "32px" }}
              onClick={() => {
                onReply(); // Call the function
                window.open(link, '_blank');
              }}
            >
              {hasReplied ? "Replied" : 'Reply'}

            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="outline"
          className={`w-[75px] hidden md:flex h-[40px] rounded-full ${hasReplied
            ? "bg-custom text-white border-white"
            : "bg-white border-neutral-700 text-black"
            } text-xs font-bold hover:bg-neutral-700 hover:text-white transition-colors`}
          style={{ lineHeight: "32px" }}
          onClick={() => {
            onReply(); // Call the function
            window.open(link, '_blank');
          }}
        >
          {hasReplied ? "Replied" : 'Reply'}
        </Button>
      </div>
    </div>
  );
};

export default function Notification() {
  const {
    reviews,
    loading,
    error,
    showMilestoneNotification,
    negativeReviews,
    milestoneData,
    repliedReviewIds,
    setRepliedReviewIds,
    toggleSidebar
    // handleReply,
  } = useFilterContext();
  const handleReply = async (reviewId) => {
    try {
      // Send the review ID to the backend
      await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/replied-reviews`, { reviewId });
      // Update the local state
      setRepliedReviewIds((prev) => [...prev, reviewId]);
    } catch (error) {
      console.error("Failed to mark review as replied:", error);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
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
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-white">Notifications</h2>
              <p className="text-neutral-400 text-xs">
                Here is your important messages
              </p>
            </div>

            {/* Filters */}
            <FilterBar />
          </div>
          <div className="grid grid-cols-1  gap-4 ">
            <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-sm font-medium flex items-center">
                  <div className="flex items-center">
                    <Icon
                      icon="mdi:notifications-active"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    <h1 className="text-lg">Recent Notifications</h1>
                  </div>
                </CardTitle>
                <Info className="h-4 w-4 text-neutral-500" />
              </CardHeader>
              <CardContent>
                {negativeReviews.length > 0 ? (
                  negativeReviews.map((review, index) => {
                    const hasReplied = repliedReviewIds.includes(review.reviewId);
                    return (
                      <Review
                        key={index}
                        author={review.name}
                        rating={review.stars}
                        content={review.text || "No text content"}
                        link={review.reviewUrl}
                        initial={review.name.charAt(0).toUpperCase()}
                        color="bg-[#FF3838]"
                        onReply={() => handleReply(review.reviewId)}
                        hasReplied={hasReplied}
                      />
                    );
                  })
                ) : (
                  <Message
                    initial="N"
                    content="No negative reviews found"
                    color="bg-green-500"
                    title="No negative reviews"
                    icon="mdi:bookmark-success"
                  />
                )}
                {showMilestoneNotification &&
                  (milestoneData.previous !== "Beginner" ? (
                    <Message
                      initial={milestoneData.current[0]}
                      content={`Let the adventure continue!`}
                      color="bg-[#4486FE]"
                      title={`Congratulations! You've been promoted to ${milestoneData.current}`}
                    />
                  ) : (
                    <Message
                      initial={milestoneData.current[0]}
                      content={`Step into the game and make your mark.`}
                      color="bg-[#4486FE]"
                      title={`The journey begins!`}
                    />
                  ))}
              </CardContent>
            </Card>

            {/* Messages */}
          </div>
        </div>
      </div>
    </div>
  );
}
