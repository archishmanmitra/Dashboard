import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useFilterContext } from '../context/FilterContext';
import { Calendar, Store, Timer } from 'lucide-react';
import { Icon } from "@iconify/react";

const FilterBar = () => {
  const {
    selectedPlace,
    setSelectedPlace,
    selectedOption,
    setSelectedOption,
    handleFilterClick
  } = useFilterContext();

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full items-end lg:w-auto">
      <div className="flex gap-6 w-full ">

      
      <div className="flex-col w-full">
        <h1 className="text-xs mb-2">
          Store
        </h1>
        <Select value={selectedPlace} onValueChange={setSelectedPlace}>
          <SelectTrigger className="w-full rounded-full px-4 sm:w-72 bg-custom-gradient border-neutral-700 text-white">
            <div className='flex items-center gap-1 justify-between'>
              <Icon icon="material-symbols:store-outline" width="20" height="20" className="mr-2" />
              <SelectValue placeholder="Simple Bar" />
            </div>
          </SelectTrigger>
          <SelectContent className='bg-custom-gradient text-white border-none'>
            <SelectItem value="simple-bar">Simple Bar</SelectItem>
            <SelectItem value="complex-bar">Complex Bar</SelectItem>
            <SelectItem value="bad-bar">Bad Bar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-col w-full">
        <h1 className="text-xs mb-2">
          Time Period
        </h1>
        <Select value={selectedOption} onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full rounded-full px-4 sm:w-72 bg-custom-gradient border-neutral-700 text-white">
            <div className='flex items-center gap-1 justify-between'>
              <Icon icon="uil:calender" width="20" height="20" className="mr-2" />
              <SelectValue placeholder="Last 7 Days" />
            </div>
          </SelectTrigger>
          <SelectContent className='bg-custom-gradient text-white border-none'>
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-90-days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </div>
      <Button
        onClick={handleFilterClick}
        className="bg-white w-full rounded-full px-6 text-black hover:bg-neutral-200"
      >
        Filter
      </Button>
    </div>
  );
};

export default FilterBar;