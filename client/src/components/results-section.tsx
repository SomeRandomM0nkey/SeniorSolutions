import { useState } from "react";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CareHomeCard } from "./care-home-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SORT_OPTIONS } from "@/lib/types";
import type { CareHome } from "@shared/schema";

interface ResultsSectionProps {
  careHomes: CareHome[];
  total: number;
  isLoading: boolean;
  currentPage: number;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onPageChange: (page: number) => void;
}

export function ResultsSection({
  careHomes,
  total,
  isLoading,
  currentPage,
  sortBy,
  onSortChange,
  onPageChange,
}: ResultsSectionProps) {
  const [compareList, setCompareList] = useState<CareHome[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleCompare = (careHome: CareHome) => {
    setCompareList(current => {
      const isAlreadyComparing = current.some(item => item.id === careHome.id);
      
      if (isAlreadyComparing) {
        return current.filter(item => item.id !== careHome.id);
      } else if (current.length < 3) {
        return [...current, careHome];
      } else {
        // Could show a toast here about max 3 items
        return current;
      }
    });
  };

  const isComparing = (careHome: CareHome) => {
    return compareList.some(item => item.id === careHome.id);
  };

  const renderPagination = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (showEllipsis) {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('...');
      }
      
      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return (
      <div className="flex justify-center items-center space-x-4 mt-12">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex space-x-2">
          {pages.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="w-10 h-10 flex items-center justify-center">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  className={currentPage === page ? "bg-care-blue text-white" : ""}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <Skeleton className="lg:w-80 h-64 lg:h-48" />
                <div className="flex-1 p-6">
                  <Skeleton className="h-6 w-64 mb-2" />
                  <Skeleton className="h-4 w-48 mb-4" />
                  <div className="flex space-x-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex space-x-3">
                      <Skeleton className="h-10 w-20" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Care Homes in San Francisco, CA</h2>
          <p className="text-gray-600 mt-1">{total} senior care facilities found</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  Sort by: {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Compare Summary */}
      {compareList.length > 0 && (
        <div className="bg-care-blue/10 border border-care-blue/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-care-blue">
                Comparing {compareList.length} care home{compareList.length !== 1 ? 's' : ''}
              </p>
              <p className="text-sm text-care-blue/80">
                {compareList.map(ch => ch.name).join(', ')}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setCompareList([])}>
                Clear
              </Button>
              <Button className="bg-care-blue text-white hover:bg-blue-600">
                Compare Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Care Home Cards */}
      {careHomes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No care homes found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {careHomes.map((careHome) => (
            <CareHomeCard
              key={careHome.id}
              careHome={careHome}
              onCompare={handleCompare}
              isComparing={isComparing(careHome)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && renderPagination()}
    </div>
  );
}
