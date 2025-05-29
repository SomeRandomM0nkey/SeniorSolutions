import { Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-care-blue to-care-green rounded-lg flex items-center justify-center">
                <Heart className="text-white h-4 w-4 fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareConnect</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-care-blue transition-colors">Find Care Homes</a>
              <a href="#" className="text-gray-700 hover:text-care-blue transition-colors">Resources</a>
              <a href="#" className="text-gray-700 hover:text-care-blue transition-colors">Support</a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-care-blue">
              <Heart className="mr-2 h-4 w-4" />
              Saved
            </Button>
            <Button className="bg-care-blue text-white hover:bg-blue-600">
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="#" className="text-gray-700 hover:text-care-blue transition-colors">Find Care Homes</a>
                  <a href="#" className="text-gray-700 hover:text-care-blue transition-colors">Resources</a>
                  <a href="#" className="text-gray-700 hover:text-care-blue transition-colors">Support</a>
                  <Button variant="ghost" className="text-gray-700 hover:text-care-blue justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Saved
                  </Button>
                  <Button className="bg-care-blue text-white hover:bg-blue-600">
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
