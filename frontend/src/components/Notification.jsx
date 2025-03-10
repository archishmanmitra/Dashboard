import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, Info, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import FilterBar from './FilterBar';
import { useFilterContext } from '../context/FilterContext';



const Message = ({ initial, content, time, color }) => {
  return (
    <div className="flex gap-4 py-4 border-b border-neutral-800 last:border-0">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
        {initial}
      </div>
      <div className="flex-1">
        <p className="text-sm text-neutral-300 mb-1">{content}</p>
        <span className="text-xs text-neutral-500">{time}</span>
      </div>
      <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
        Reply
      </Button>
    </div>
  );
};

export default function Notification() {
  const { reviews, loading, error, showMilestoneNotification} = useFilterContext();

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading reviews...</p>
    );
  if (error)
    return <p className="text-center text-red-500 text-lg">Error: {error}</p>;
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
 {showMilestoneNotification ? (
  <Card className="bg-neutral-800 border-none text-white">
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Your Progress
          </CardTitle>
          <Info className="h-4 w-4 text-neutral-500" />
        </CardHeader>
        <CardContent>
          <Message
            initial="N"
            content="Lorem ipsum dolor sit amet consectetur. Gravida urna magna feugiat morbi. Euismod fermentum consectetur porta erat. Sed lacus erat integer malesuada eu et pharetra nulla tortor. Mnante aliquet a mauris interdum."
            time="12:00 pm"
            color="bg-red-500"
          />
          <Message
            initial="S"
            content="Lorem ipsum dolor sit amet consectetur. Gravida urna magna feugiat morbi. Euismod fermentum consectetur porta erat. Sed lacus erat integer malesuada eu et pharetra nulla tortor. Mnante aliquet a mauris interdum."
            time="12:00 pm"
            color="bg-blue-500"
          />
        </CardContent>
      </Card>
 ) : (
  <div> lol </div>
 )}
      {/* Messages */}
      
    </div>
    </div>
  );
}