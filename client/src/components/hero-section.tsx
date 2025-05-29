import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CARE_TYPES } from "@/lib/types";

interface HeroSectionProps {
  onSearch: (location: string, careType: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const location = formData.get('location') as string || '';
    const careType = formData.get('careType') as string || '';
    onSearch(location, careType);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-green-25 to-orange-25 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find the Perfect Care Home for Your Loved One
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with trusted senior care facilities that meet your family's unique needs. Professional, compassionate care starts here.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, state, or zip code"
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
              <div>
                <Label htmlFor="careType" className="block text-sm font-medium text-gray-700 mb-2">
                  Care Type
                </Label>
                <Select name="careType">
                  <SelectTrigger>
                    <SelectValue placeholder="Any Care Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Care Level</SelectItem>
                    {CARE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-care-blue text-white hover:bg-blue-600">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
