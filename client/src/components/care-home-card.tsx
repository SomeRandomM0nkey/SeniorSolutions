import { useState } from "react";
import { Heart, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CareHome } from "@shared/schema";

interface CareHomeCardProps {
  careHome: CareHome;
  onCompare?: (careHome: CareHome) => void;
  isComparing?: boolean;
}

export function CareHomeCard({ careHome, onCompare, isComparing }: CareHomeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const inquiryMutation = useMutation({
    mutationFn: async (data: { careHomeId: number; name: string; email: string; phone?: string; message?: string }) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Sent!",
        description: `Thank you for your interest in ${careHome.name}! A care coordinator will contact you within 24 hours.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? `${careHome.name} has been removed from your favorites.`
        : `${careHome.name} has been added to your favorites.`,
    });
  };

  const handleRequestInfo = () => {
    // In a real app, this would open a modal with a form
    // For now, we'll create a mock inquiry
    const mockInquiry = {
      careHomeId: careHome.id,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      message: "I'm interested in learning more about your care options.",
    };
    
    inquiryMutation.mutate(mockInquiry);
  };

  const getAvailabilityBadge = () => {
    switch (careHome.bedAvailability) {
      case "Available Now":
        return (
          <Badge className="bg-status-available text-white">
            <div className="w-2 h-2 bg-white rounded-full mr-1" />
            Available Now
          </Badge>
        );
      case "Limited Availability":
        return (
          <Badge className="bg-status-limited text-white">
            <div className="w-2 h-2 bg-white rounded-full mr-1" />
            Limited Availability
          </Badge>
        );
      case "Waitlist Only":
        return (
          <Badge className="bg-status-unavailable text-white">
            <div className="w-2 h-2 bg-white rounded-full mr-1" />
            Waitlist Only
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCareTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Independent Living":
        return "bg-blue-100 text-blue-800";
      case "Assisted Living":
        return "bg-care-blue/10 text-care-blue";
      case "Memory Care":
        return "bg-care-green/10 text-care-green";
      case "Skilled Nursing":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-80 h-64 lg:h-auto relative">
          <img
            src={careHome.images[0]}
            alt={careHome.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </Button>
          <div className="absolute bottom-4 left-4">
            {getAvailabilityBadge()}
          </div>
        </div>
        
        <CardContent className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-care-blue cursor-pointer">
                {careHome.name}
              </h3>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                {careHome.distance} miles away • {careHome.city}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium ml-1">{careHome.rating}</span>
                <span className="text-gray-500 ml-1">({careHome.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {careHome.careTypes.map((type) => (
              <Badge key={type} variant="secondary" className={getCareTypeBadgeColor(type)}>
                {type}
              </Badge>
            ))}
            {careHome.amenities.slice(0, 2).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-gray-600">
                {amenity}
              </Badge>
            ))}
            {careHome.amenities.length > 2 && (
              <Badge variant="outline" className="text-gray-600">
                +{careHome.amenities.length - 2} more
              </Badge>
            )}
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {careHome.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${parseFloat(careHome.startingPrice).toLocaleString()}
              </span>
              <span className="text-gray-600">/month</span>
              <p className="text-sm text-gray-500">{careHome.priceDescription}</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant={isComparing ? "default" : "outline"}
                onClick={() => onCompare?.(careHome)}
                className={isComparing ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white" : "border-care-blue text-care-blue hover:bg-care-blue hover:text-white"}
              >
                {isComparing ? "Remove" : "Compare"}
              </Button>
              <Button
                onClick={handleRequestInfo}
                disabled={inquiryMutation.isPending || careHome.bedAvailability === "Waitlist Only"}
                className="bg-care-blue text-white hover:bg-blue-600"
              >
                {careHome.bedAvailability === "Waitlist Only" ? "Join Waitlist" : "Request Info"}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
