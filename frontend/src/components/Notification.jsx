import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Info, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';



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
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notification</h1>
          <p className="text-sm text-neutral-400">Here is your important messages</p>
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

      {/* Messages */}
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
    </div>
  );
}