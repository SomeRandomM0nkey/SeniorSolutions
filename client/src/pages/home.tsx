import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterSidebar } from "@/components/filter-sidebar";
import { ResultsSection } from "@/components/results-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { useCareHomes } from "@/hooks/use-care-homes";
import type { FilterState } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
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

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useCareHomes(filters, currentPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSearch = (location: string, careType: string) => {
    setFilters(prev => ({
      ...prev,
      location,
      careTypes: careType ? [careType] : [],
    }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600">Failed to load care homes. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            filters={filters} 
            onFiltersChange={setFilters} 
          />
          
          <ResultsSection
            careHomes={data?.careHomes || []}
            total={data?.total || 0}
            isLoading={isLoading}
            currentPage={currentPage}
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <CTASection />
      <Footer />
    </div>
  );
}
