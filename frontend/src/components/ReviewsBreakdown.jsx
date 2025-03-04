import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Star, Info } from 'lucide-react';

export default function ReviewsBreakdown() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Review Breakdown</h1>
      </div>
      
      <div className="space-y-4">
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium flex items-center">
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              Review Distribution
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-neutral-400">Review breakdown content will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}