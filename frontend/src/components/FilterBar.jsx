import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useFilterContext } from '../context/FilterContext';
import { Calendar, Store, Timer } from 'lucide-react';

const FilterBar = () => {
  const {
    selectedPlace,
    setSelectedPlace,
    selectedOption,
    setSelectedOption,
    handleFilterClick
  } = useFilterContext();

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
      <Select value={selectedPlace} onValueChange={setSelectedPlace}>
        <SelectTrigger className="w-full sm:w-48 bg-neutral-800 border-neutral-700 text-white">
          <div className='flex items-center gap-2 justify-between'>
          <Store className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Simple Bar" />

          </div>
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="simple-bar">Simple Bar</SelectItem>
          <SelectItem value="complex-bar">Complex Bar</SelectItem>
          <SelectItem value="bad-bar">Bad Bar</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger className="w-full sm:w-48 bg-neutral-800 border-neutral-700 text-white">
          <Timer className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Last 7 days" />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="last-7-days">Last 7 days</SelectItem>
          <SelectItem value="last-30-days">Last 30 days</SelectItem>
          <SelectItem value="last-90-days">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={handleFilterClick}
        className="bg-white text-black hover:bg-neutral-200"
      >
        Filter
      </Button>
    </div>
  );
};

export default FilterBar;