import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageSquare, Info } from 'lucide-react';

export default function Notification() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>
      
      <div className="space-y-4">
        <Card className="bg-neutral-800 border-none text-white">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
              Recent Notifications
            </CardTitle>
            <Info className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-neutral-400">Notifications will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}