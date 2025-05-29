export interface FilterState {
  location: string;
  careTypes: string[];
  bedAvailability: string[];
  amenities: string[];
  roomTypes: string[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  keyword: string;
  sortBy: string;
}

export const CARE_TYPES = [
  "Independent Living",
  "Assisted Living", 
  "Memory Care",
  "Skilled Nursing"
];

export const BED_AVAILABILITY = [
  "Available Now",
  "Limited Availability",
  "Waitlist Only"
];

export const AMENITIES = [
  "Pet Friendly",
  "Wheelchair Accessible",
  "24/7 Medical Staff",
  "Physical Therapy",
  "Dining Room",
  "Garden/Outdoor Space",
  "Fitness Center",
  "Swimming Pool",
  "Spa Services",
  "Concierge",
  "Art Therapy",
  "Secure Unit",
  "Bay Views",
  "Garden Views",
  "Golf Course"
];

export const ROOM_TYPES = [
  "Private Room",
  "Semi-Private",
  "Studio Apartment",
  "One Bedroom",
  "Two Bedroom"
];

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "distance", label: "Distance" },
  { value: "rating", label: "Rating" },
  { value: "availability", label: "Availability" }
];
