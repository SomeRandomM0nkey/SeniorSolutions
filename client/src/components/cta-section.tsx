import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-care-blue to-care-green py-16 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Need Help Finding the Right Care?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Our care coordinators are here to help. Get personalized recommendations and support throughout your search process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white text-care-blue px-8 hover:bg-gray-100"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call (555) 123-4567
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-care-blue px-8"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
