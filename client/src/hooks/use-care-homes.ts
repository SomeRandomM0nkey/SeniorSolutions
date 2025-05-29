import { useQuery } from "@tanstack/react-query";
import type { CareHome, SearchFilters } from "@shared/schema";
import type { FilterState } from "@/lib/types";

interface CareHomesResponse {
  careHomes: CareHome[];
  total: number;
}

export function useCareHomes(filters: FilterState, page: number = 1) {
  return useQuery<CareHomesResponse>({
    queryKey: ['/api/care-homes', filters, page],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      if (filters.location) searchParams.set('location', filters.location);
      if (filters.keyword) searchParams.set('keyword', filters.keyword);
      if (filters.sortBy) searchParams.set('sortBy', filters.sortBy);
      if (filters.minPrice !== undefined) searchParams.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) searchParams.set('maxPrice', filters.maxPrice.toString());
      
      filters.careTypes.forEach(type => searchParams.append('careTypes', type));
      filters.bedAvailability.forEach(status => searchParams.append('bedAvailability', status));
      filters.amenities.forEach(amenity => searchParams.append('amenities', amenity));
      filters.roomTypes.forEach(type => searchParams.append('roomTypes', type));
      
      searchParams.set('page', page.toString());
      searchParams.set('limit', '12');

      const response = await fetch(`/api/care-homes?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch care homes');
      }
      return response.json();
    },
  });
}

export function useCareHome(id: number) {
  return useQuery<CareHome>({
    queryKey: ['/api/care-homes', id],
    queryFn: async () => {
      const response = await fetch(`/api/care-homes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch care home');
      }
      return response.json();
    },
  });
}
