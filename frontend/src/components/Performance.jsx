import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Info, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';



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
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance</h1>
          <p className="text-sm text-neutral-400">Monitor your software performance</p>
        </div>
        <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-48">
            <Select defaultValue="temple-bar">
              <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                <SelectValue placeholder="Temple Bar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temple-bar">Temple Bar</SelectItem>
                <SelectItem value="other-location">Other Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select defaultValue="last-7-days">
              <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                <SelectValue placeholder="Last 7 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          Filter
        </Button>
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
                <h2 className="text-4xl font-bold">1204</h2>
                <p className="text-xs text-neutral-400">reviews & average of 4.8 Stars</p>
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
                <h2 className="text-4xl font-bold">12</h2>
                <p className="text-xs text-neutral-400">reviews & average of 4.5 Stars</p>
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
            <ProgressBadge
              icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
              title="Beginner"
              reviews="0-9 reviews"
              completed={true}
            />
            <ProgressBadge
              icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
              title="Amateur"
              reviews="10-49 reviews"
              completed={true}
            />
            <ProgressBadge
              icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
              title="Challenger"
              reviews="50-99 reviews"
              active={true}
              completed={true}
            />
            <ProgressBadge
              icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
              title="Master"
              reviews="100-499 reviews"
            />
            <ProgressBadge
              icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
              title="Legend"
              reviews="500-999 reviews"
            />
            <ProgressBadge
              icon="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/starship.svg"
              title="Grandmaster"
              reviews="1000+ reviews"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}