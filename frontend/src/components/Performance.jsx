import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, ArrowUpRight, Download, Info, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import FilterBar from './FilterBar';
import { useFilterContext } from '../context/FilterContext';

const ProgressBadge = ({ icon, title, reviews, active, completed }) => {
  return (
    <div className={`flex flex-col items-center ${active ? 'text-white' : 'text-neutral-600'}`}>
      <div className={`w-16 flex-col flex gap-6 h-16 mb-2 relative ${completed ? 'opacity-100' : 'opacity-100'}`}>
        <img src={icon} alt={title} className=" h-[158px]" />
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
    determineMilestone,
    click,
    counts
  } = useFilterContext();

  // useEffect(() => {
  //   if (performance.navigation.type === 1) {  // 1 = Reload, 0 = Normal navigation
  //     fetchReviews();
  //   };
  // }, []);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading performance data...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">Error: {error}</p>;

  // Milestone calculation
  const currentMilestone = placeInfo ? determineMilestone(placeInfo.reviewsCount) : 'Beginner';
  const milestones = [
    { title: 'Beginner', reviews: '0-9 reviews', minReviews: 0, maxReviews: 9, icon: '/beginner.png' },
    { title: 'Amateur', reviews: '10-49 reviews', minReviews: 10, maxReviews: 49, icon: '/amateur.png' },
    { title: 'Challenger', reviews: '50-99 reviews', minReviews: 50, maxReviews: 99, icon: '/challenger.png' },
    { title: 'Master', reviews: '100-499 reviews', minReviews: 100, maxReviews: 499, icon: '/master.png' },
    { title: 'Legend', reviews: '500-999 reviews', minReviews: 500, maxReviews: 999, icon: '/legend.png' },
    { title: 'Grandmaster', reviews: '1000+ reviews', minReviews: 1000, maxReviews: Infinity, icon: '/grandmaster.png' }
  ];

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
            <h2 className="text-xl text-white">Notification</h2>
            <p className="text-neutral-400">Here is your important messages</p>
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
        <Card className="bg-neutral-800 border-none mt-5 mb-5 text-white">
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
                  icon={milestone.icon}
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
              <span>+15% improved from last week</span>
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
              <span>+15% improved from last week</span>
            </div>
          </CardContent>
        </Card>

</div>
      </div>
    </div>
  );
}