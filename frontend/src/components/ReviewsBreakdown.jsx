import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Star, Info, RefreshCcw, MapPin, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import FilterBar from "./FilterBar";
import { useFilterContext } from "../context/FilterContext";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

const Review = ({ author, rating, content }) => {
  return (
    <div className="py-3 border-b border-neutral-800 last:border-0">
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm">{author}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={cn(
                "text-transparent",
                i < rating
                  ? ` ${rating > 3
                    ? " fill-[#1EC928]"
                    : rating == 3
                      ? " fill-[#F7C73B]"
                      : "fill-[#FF3838]"
                  }`
                  : "fill-[#393939]"
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-neutral-400">{content}</p>
    </div>
  );
};

export default function ReviewsBreakdown() {
  const { reviews, loading, error, analysis } = useFilterContext();

  // Function to get recent reviews
  const getRecentReviews = () => {
    return reviews.map((review) => ({
      author: review.name || "Anonymous",
      rating: review.stars,
      content: review.text || "No text content",
    }));
  };

  // Function to calculate star distribution
  const calculateStarDistribution = () => {
    const starCounts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      const stars = review.stars;
      if (stars >= 1 && stars <= 5) {
        starCounts[stars]++;
      }
    });

    return starCounts;
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  const recentReviews = getRecentReviews();
  const starDistribution = calculateStarDistribution();

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
            <h2 className="text-2xl text-white">Review Breakdown</h2>
            <p className="text-neutral-400 text-xs">Detailed analysis of your reviews</p>
          </div>



          {/* Filters */}
          <FilterBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sentiment Analysis */}
        <Card className="bg-custom-gradient border border-[var(--color-bodcol)] text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium">
              🎭 Sentiment Analysis
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <h1 className="text-white text-2xl">
              {analysis}
            </h1>
            <Button variant="outline" className="bg-white text-black hover:bg-neutral-200" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardContent>
        </Card>

          {/* Recent Reviews */}
          <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium">
                💬 Recent Reviews
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent className="space-y-1">
              {recentReviews.map((review, index) => (
                <Review
                  key={index}
                  author={review.author}
                  rating={review.rating}
                  content={review.content}
                />
              ))}
            </CardContent>
          </Card>

          {/* Star Distribution */}
          <Card className="bg-custom-gradient border border-[var(--color-bodcol)] z-10 text-white">
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-sm font-medium">
                ≡ Star Distribution
              </CardTitle>
              <Info className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(() => {
                  const maxCount = Math.max(
                    ...Object.values(starDistribution),
                    1
                  ); // Avoid division by zero

                  return [5, 4, 3, 2, 1].map((stars) => {
                    const percentage =
                      (starDistribution[stars] / maxCount) * 100; // Scale based on highest count

                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="w-4 text-sm">{stars}</span>
                        <div className="relative w-full h-2 bg-neutral-700 rounded-md overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full rounded-md"
                            style={{
                              width: `${percentage}%`,
                              background:
                                "linear-gradient(90deg, #4385FF 0%, #7DC6FF 100%)",
                            }}
                          />
                        </div>
                        <span className="w-8 text-sm text-right">
                          {starDistribution[stars]}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </CardContent>
          </Card>

          {/* Best Performing Locations */}
          {/* <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium">
              <MapPin className="h-4 w-4 inline mr-2" />
              Best Performing Locations
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <h3 className="font-medium">North City</h3>
                  <p className="text-sm text-green-400">340 Stars</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium">East City</h3>
                  <p className="text-sm text-blue-400">186 Stars</p>
                </div>
                <div>
                  <h3 className="font-medium">South City</h3>
                  <p className="text-sm text-yellow-400">120 Stars</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-green-400 absolute opacity-30"></div>
                <div className="w-32 h-32 rounded-full border-8 border-blue-400 absolute opacity-30" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                <div className="w-32 h-32 rounded-full border-8 border-yellow-400 absolute opacity-30" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 50%)' }}></div>
                <div className="w-32 h-32 rounded-full bg-neutral-900 absolute flex items-center justify-center">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
        </div>
      </div>
      </div>
    </div>
  );
}
