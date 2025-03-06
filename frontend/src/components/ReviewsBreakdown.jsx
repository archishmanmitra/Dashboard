import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Star, Info, RefreshCcw, MapPin, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import FilterBar from './FilterBar';
import { useFilterContext } from '../context/FilterContext';

const Review = ({ author, rating, content }) => {
  return (
    <div className="py-3 border-b border-neutral-800 last:border-0">
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm">{author}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-neutral-400">{content}</p>
    </div>
  );
};

export default function ReviewsBreakdown() {
  const { reviews, loading, error } = useFilterContext();

  // Function to get recent reviews
  const getRecentReviews = () => {
    return reviews
      .slice(0, 5)
      .map(review => ({
        author: review.name || "Anonymous",
        rating: review.stars,
        content: review.text || "No text content"
      }));
  };

  // Function to calculate star distribution
  const calculateStarDistribution = () => {
    const starCounts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    reviews
      .forEach(review => {
        const stars = review.stars;
        if (stars >= 1 && stars <= 5) {
          starCounts[stars]++;
        }
      });

    return starCounts;
  };

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading reviews...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  const recentReviews = getRecentReviews();
  const starDistribution = calculateStarDistribution();

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
            <h2 className="text-2xl font-semibold">Review Breakdown</h2>
            <p className="text-sm text-neutral-400">Detailed analysis of your reviews</p>
          </div>

          {/* Filters */}
          <FilterBar/>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment Analysis
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium">
              🎭 Sentiment Analysis
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-400 mb-4">
              Analyze the overall sentiment of customer reviews to understand their experience.
            </p>
            <Button variant="outline" className="bg-white text-black hover:bg-neutral-200" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardContent>
        </Card> */}

        {/* Recent Reviews */}
        <Card className="bg-neutral-800 border-none text-white">
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
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium">
              ≡ Star Distribution
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-4 text-sm">{stars}</span>
                  <Progress 
                    value={(starDistribution[stars] / reviews.length) * 100} 
                    className="h-2 bg-neutral-700" 
                    indicatorClassName="bg-blue-400" 
                  />
                  <span className="w-8 text-sm text-right">{starDistribution[stars]}</span>
                </div>
              ))}
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
  );
}