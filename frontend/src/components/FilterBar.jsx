import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useFilterContext } from '../context/FilterContext';
import { Calendar } from 'lucide-react';

const FilterBar = () => {
  const { 
    selectedPlace, 
    setSelectedPlace, 
    selectedOption, 
    setSelectedOption, 
    handleFilterClick 
  } = useFilterContext();

  return (
    <div className="flex justify-between gap-6 items-center">
    <div className="flex gap-6">
      <div className="w-48">
        <Select value={selectedPlace}
          onValueChange={setSelectedPlace}>
          <SelectTrigger className="bg-neutral-800 gap-2 border-white rounded-full text-white">
            <Calendar />
            <SelectValue placeholder="Simple Bar" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="simple-bar">Simple Bar</SelectItem>
            <SelectItem value="complex-bar">Complex Bar</SelectItem>
            <SelectItem value="bad-bar">Bad Bar</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <Select value={selectedOption} onValueChange={setSelectedOption}>
          <SelectTrigger className="bg-neutral-800 gap-2 border-white rounded-full text-white">
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className='bg-white' >
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-90-days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <Button
      variant="primary"
      className="bg-white border-neutral-700 rounded-full text-black hover:bg-gray-500"
      onClick={handleFilterClick}
    >
      Filter
    </Button>
  </div>
  );
};

export default FilterBar;