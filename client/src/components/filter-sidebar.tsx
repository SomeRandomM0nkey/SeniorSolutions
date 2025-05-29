import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Map } from "lucide-react";
import { CARE_TYPES, BED_AVAILABILITY, AMENITIES, ROOM_TYPES } from "@/lib/types";
import type { FilterState } from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.minPrice || 0,
    filters.maxPrice || 10000
  ]);

  const clearAllFilters = () => {
    onFiltersChange({
      location: "",
      careTypes: [],
      bedAvailability: [],
      amenities: [],
      roomTypes: [],
      minPrice: undefined,
      maxPrice: undefined,
      keyword: "",
      sortBy: "recommended",
    });
    setPriceRange([0, 10000]);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    updateFilter('minPrice', values[0] === 0 ? undefined : values[0]);
    updateFilter('maxPrice', values[1] === 10000 ? undefined : values[1]);
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available Now":
        return "bg-status-available";
      case "Limited Availability":
        return "bg-status-limited";
      case "Waitlist Only":
        return "bg-status-unavailable";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="lg:w-80 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" onClick={clearAllFilters} className="text-care-blue hover:text-blue-600 text-sm font-medium">
              Clear all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Bed Availability Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Bed Availability</h4>
            <div className="space-y-2">
              {BED_AVAILABILITY.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`availability-${status}`}
                    checked={filters.bedAvailability.includes(status)}
                    onCheckedChange={() => toggleArrayFilter('bedAvailability', status)}
                  />
                  <Label htmlFor={`availability-${status}`} className="text-sm text-gray-600 flex-1">
                    {status}
                  </Label>
                  <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(status)}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Monthly Cost</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] === 0 ? '' : priceRange[0]}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : 0;
                    handlePriceChange([value, priceRange[1]]);
                  }}
                  className="w-24 text-sm"
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === 10000 ? '' : priceRange[1]}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : 10000;
                    handlePriceChange([priceRange[0], value]);
                  }}
                  className="w-24 text-sm"
                />
              </div>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$10,000+</span>
              </div>
            </div>
          </div>

          {/* Care Level */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Care Level</h4>
            <div className="space-y-2">
              {CARE_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`care-${type}`}
                    checked={filters.careTypes.includes(type)}
                    onCheckedChange={() => toggleArrayFilter('careTypes', type)}
                  />
                  <Label htmlFor={`care-${type}`} className="text-sm text-gray-600">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Amenities</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {AMENITIES.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => toggleArrayFilter('amenities', amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="text-sm text-gray-600">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Room Type */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Room Type</h4>
            <div className="space-y-2">
              {ROOM_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`room-${type}`}
                    checked={filters.roomTypes.includes(type)}
                    onCheckedChange={() => toggleArrayFilter('roomTypes', type)}
                  />
                  <Label htmlFor={`room-${type}`} className="text-sm text-gray-600">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Map View Toggle */}
      <Card>
        <CardContent className="p-4">
          <Button variant="secondary" className="w-full">
            <Map className="mr-2 h-4 w-4" />
            Show Map
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
