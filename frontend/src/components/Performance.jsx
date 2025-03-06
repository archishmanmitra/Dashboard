import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, Info, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import FilterBar from './FilterBar';
import { useFilterContext } from '../context/FilterContext';

const ProgressBadge = ({ icon, title, reviews, active, completed }) => {
  return (
    <div className={`flex flex-col items-center ${active ? 'text-white' : 'text-neutral-600'}`}>
      <div className={`w-16 h-16 mb-2 relative ${completed ? 'opacity-100' : 'opacity-50'}`}>
        <img src={icon} alt={title} className="w-full h-full" />
        {completed && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-neutral-500">{reviews}</span>
    </div>
  );
};

export default function Performance() {
  const { 
    placeInfo, 
    loading, 
    error, 
    fetchReviews, 
    determineMilestone 
  } = useFilterContext();

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading performance data...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  // Milestone calculation
  const currentMilestone = placeInfo ? determineMilestone(placeInfo.reviewsCount) : 'Beginner';
  const milestones = [
    { title: 'Beginner', reviews: '0-9 reviews', minReviews: 0, maxReviews: 9 },
    { title: 'Amateur', reviews: '10-49 reviews', minReviews: 10, maxReviews: 49 },
    { title: 'Challenger', reviews: '50-99 reviews', minReviews: 50, maxReviews: 99 },
    { title: 'Master', reviews: '100-499 reviews', minReviews: 100, maxReviews: 499 },
    { title: 'Legend', reviews: '500-999 reviews', minReviews: 500, maxReviews: 999 },
    { title: 'Grandmaster', reviews: '1000+ reviews', minReviews: 1000, maxReviews: Infinity }
  ];

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
            <h2 className="text-2xl font-semibold">Performance</h2>
            <p className="text-sm text-neutral-400">Monitor your software performance</p>
          </div>

          {/* Filters */}
          <FilterBar/>
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
                <p className="text-xs text-neutral-400">reviews & average of 4.2 Stars</p>
              </div>
              <div className="text-lg font-medium">vs</div>
              <div className="text-center">
                <p className="text-sm text-green-400">After</p>
                <h2 className="text-4xl font-bold">{placeInfo ? placeInfo.reviewsCount : 'N/A'}</h2>
                <p className="text-xs text-neutral-400">reviews & average of {placeInfo ? placeInfo.totalScore : 'N/A'} Stars</p>
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
                <h2 className="text-4xl font-bold">{placeInfo ? placeInfo.reviewsCount : 'N/A'}</h2>
                <p className="text-xs text-neutral-400">reviews & average of {placeInfo ? placeInfo.totalScore : 'N/A'} Stars</p>
              </div>
              <div className="text-lg font-medium">vs</div>
              <div className="text-center">
                <p className="text-sm text-neutral-400">Salt paper</p>
                <h2 className="text-4xl font-bold">10</h2>
                <p className="text-xs text-neutral-400">reviews & average of 4.5 Stars</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Progress */}
      <Card className="bg-neutral-800 border-none text-white">
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Your Progress
          </CardTitle>
          <Info className="h-4 w-4 text-neutral-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            {milestones.map((milestone, index) => (
              <ProgressBadge
                key={index}
                icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
                title={milestone.title}
                reviews={milestone.reviews}
                active={currentMilestone === milestone.title}
                completed={
                  placeInfo && 
                  placeInfo.reviewsCount >= milestone.minReviews && 
                  placeInfo.reviewsCount <= milestone.maxReviews
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}