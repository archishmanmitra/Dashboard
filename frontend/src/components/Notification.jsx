import React from "react";
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

const Message = ({ initial, content, link, color, title }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-neutral-800 last:border-0">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {initial}
      </div>
      <div className="flex-1 flex-col">
        <p className="text-sm text-neutral-300 mb-1">{title}</p>
        <span className="text-xs text-neutral-500">{content}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
        onClick={() => window.open(link, "_blank")}
      >
        Reply
      </Button>
    </div>
  );
};

const Review = ({ initial, author, rating, content, link, color }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-neutral-800 last:border-0">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {initial}
      </div>
      <div className="flex-1 flex-col">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-neutral-300">{author}</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
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
        </div>
        <div className="flex justify-between items-start">
          <span className="text-xs text-neutral-500 pr-4">{content}</span>
          <Button
            variant="outline"
            className="w-[95px] h-[32px] rounded-[32px] bg-white border border-neutral-700 mt-1 text-black hover:bg-neutral-700 hover:text-white transition-colors"
            style={{ lineHeight: "32px" }}
            onClick={() => window.open(link, "_blank")}
          >
            Reply
          </Button>
        </div>
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
  } = useFilterContext();

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
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
          background:
            "radial-gradient(circle, rgba(67, 133, 255, 0.26) 0%, rgba(0, 0, 0, 0) 70%)",
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
              <h2 className="text-2xl text-white">Notifications</h2>
              <p className="text-neutral-400 text-xs">
                Here is your important messages
              </p>
            </div>

            {/* Filters */}
            <FilterBar />
          </div>

          <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Recent Notifications
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              {negativeReviews.length > 0 ? (
                negativeReviews.map((review, index) => {
                  return (
                    <Review
                      key={index}
                      author={review.name}
                      rating={review.stars}
                      content={review.text}
                      link={review.reviewUrl}
                      initial={review.name.charAt(0).toUpperCase()}
                      color="bg-red-500"
                    />
                  );
                })
              ) : (
                <Message
                  initial="N"
                  content="No negative reviews found"
                  color="bg-green-500"
                  title="No negative reviews"
                />
              )}
              <Message
                initial="N"
                content="Lorem ipsum dolor sit amet consectetur. Gravida urna magna feugiat morbi. Euismod fermentum consectetur porta erat. Sed lacus erat integer malesuada eu et pharetra nulla tortor. Mnante aliquet a mauris interdum."
                color="bg-red-500"
                title="Lol"
              />
              <Message
                initial="S"
                content="Lorem ipsum dolor sit amet consectetur. Gravida urna magna feugiat morbi. Euismod fermentum consectetur porta erat. Sed lacus erat integer malesuada eu et pharetra nulla tortor. Mnante aliquet a mauris interdum."
                color="bg-blue-500"
                title="Lol"
              />
            </CardContent>
          </Card>

          {/* Messages */}
        </div>
      </div>
    </div>
  );
}
