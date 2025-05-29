import { careHomes, inquiries, type CareHome, type InsertCareHome, type Inquiry, type InsertInquiry, type SearchFilters } from "@shared/schema";

export interface IStorage {
  getCareHome(id: number): Promise<CareHome | undefined>;
  getCareHomes(filters: SearchFilters): Promise<{ careHomes: CareHome[]; total: number }>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private careHomes: Map<number, CareHome>;
  private inquiries: Map<number, Inquiry>;
  private currentCareHomeId: number;
  private currentInquiryId: number;

  constructor() {
    this.careHomes = new Map();
    this.inquiries = new Map();
    this.currentCareHomeId = 1;
    this.currentInquiryId = 1;
    this.seedCareHomes();
  }

  private seedCareHomes() {
    const sampleCareHomes: CareHome[] = [
      {
        id: 1,
        name: "Sunrise Manor Senior Living",
        description: "Elegant assisted living community featuring spacious private suites, gourmet dining, and comprehensive wellness programs. Located in the heart of Pacific Heights with stunning city views.",
        address: "1234 Pacific Ave",
        city: "San Francisco",
        state: "CA",
        zipCode: "94109",
        phone: "(555) 123-4567",
        email: "info@sunrisemanor.com",
        website: "https://sunrisemanor.com",
        startingPrice: "4200",
        priceDescription: "Starting price for private room",
        latitude: "37.7749",
        longitude: "-122.4194",
        distance: "1.2",
        rating: "4.8",
        reviewCount: 127,
        careTypes: ["Assisted Living", "Memory Care"],
        amenities: ["Pet Friendly", "24/7 Medical Staff", "Dining Room", "Garden/Outdoor Space", "Physical Therapy"],
        roomTypes: ["Private Room", "Studio Apartment"],
        bedAvailability: "Available Now",
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: true,
        petFriendly: true,
        wheelchairAccessible: true,
        medicalStaff24_7: true,
      },
      {
        id: 2,
        name: "Golden Gate Gardens",
        description: "Award-winning senior community with beautiful garden courtyards and resort-style amenities. Offering both independent and assisted living options with exceptional dining and activities.",
        address: "2345 Richmond Blvd",
        city: "San Francisco",
        state: "CA",
        zipCode: "94118",
        phone: "(555) 234-5678",
        email: "contact@goldengategardens.com",
        website: "https://goldengategardens.com",
        startingPrice: "3800",
        priceDescription: "Starting price for studio",
        latitude: "37.7849",
        longitude: "-122.4594",
        distance: "2.1",
        rating: "4.9",
        reviewCount: 203,
        careTypes: ["Independent Living", "Assisted Living"],
        amenities: ["Garden Views", "Fitness Center", "Dining Room", "Wheelchair Accessible"],
        roomTypes: ["Studio Apartment", "One Bedroom", "Private Room"],
        bedAvailability: "Limited Availability",
        images: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: true,
        petFriendly: false,
        wheelchairAccessible: true,
        medicalStaff24_7: false,
      },
      {
        id: 3,
        name: "Serenity Memory Care",
        description: "Specialized memory care facility designed specifically for residents with Alzheimer's and dementia. Features secure outdoor gardens, personalized care plans, and innovative therapeutic programs.",
        address: "3456 Mission Bay Dr",
        city: "San Francisco",
        state: "CA",
        zipCode: "94158",
        phone: "(555) 345-6789",
        email: "info@serenitymemorycare.com",
        website: "https://serenitymemorycare.com",
        startingPrice: "5600",
        priceDescription: "Starting price for private suite",
        latitude: "37.7649",
        longitude: "-122.3894",
        distance: "0.8",
        rating: "4.7",
        reviewCount: 89,
        careTypes: ["Memory Care"],
        amenities: ["Secure Unit", "Art Therapy", "Garden/Outdoor Space", "24/7 Medical Staff"],
        roomTypes: ["Private Room", "Semi-Private"],
        bedAvailability: "Available Now",
        images: [
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: false,
        petFriendly: false,
        wheelchairAccessible: true,
        medicalStaff24_7: true,
      },
      {
        id: 4,
        name: "Harbor View Senior Living",
        description: "Luxury waterfront senior living community with panoramic bay views. Premium amenities include fine dining, spa services, and a rooftop terrace. High demand location with waiting list.",
        address: "4567 Marina Blvd",
        city: "San Francisco",
        state: "CA",
        zipCode: "94123",
        phone: "(555) 456-7890",
        email: "info@harborviewsl.com",
        website: "https://harborviewsl.com",
        startingPrice: "6500",
        priceDescription: "Starting price for one bedroom",
        latitude: "37.8049",
        longitude: "-122.4394",
        distance: "3.4",
        rating: "4.9",
        reviewCount: 156,
        careTypes: ["Independent Living", "Assisted Living"],
        amenities: ["Bay Views", "Concierge", "Spa Services", "Dining Room", "Fitness Center"],
        roomTypes: ["One Bedroom", "Studio Apartment", "Private Room"],
        bedAvailability: "Waitlist Only",
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: true,
        petFriendly: false,
        wheelchairAccessible: true,
        medicalStaff24_7: true,
      },
      {
        id: 5,
        name: "Sunset Hills Assisted Living",
        description: "Warm and welcoming assisted living community with personalized care plans and engaging activities. Our dedicated staff provides 24/7 support in a home-like environment.",
        address: "5678 Sunset Blvd",
        city: "San Francisco",
        state: "CA",
        zipCode: "94122",
        phone: "(555) 567-8901",
        email: "info@sunsethills.com",
        website: "https://sunsethills.com",
        startingPrice: "3200",
        priceDescription: "Starting price for shared room",
        latitude: "37.7549",
        longitude: "-122.4894",
        distance: "4.2",
        rating: "4.6",
        reviewCount: 94,
        careTypes: ["Assisted Living"],
        amenities: ["Pet Friendly", "Garden/Outdoor Space", "Physical Therapy", "Dining Room"],
        roomTypes: ["Semi-Private", "Private Room"],
        bedAvailability: "Available Now",
        images: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: false,
        petFriendly: true,
        wheelchairAccessible: true,
        medicalStaff24_7: true,
      },
      {
        id: 6,
        name: "Bayshore Independent Living",
        description: "Active adult community for independent seniors who want to maintain their lifestyle while having access to services when needed. Resort-style amenities and social activities.",
        address: "6789 Bayshore Dr",
        city: "San Francisco",
        state: "CA",
        zipCode: "94124",
        phone: "(555) 678-9012",
        email: "info@bayshoreindependent.com",
        website: "https://bayshoreindependent.com",
        startingPrice: "2800",
        priceDescription: "Starting price for studio apartment",
        latitude: "37.7349",
        longitude: "-122.3794",
        distance: "5.1",
        rating: "4.5",
        reviewCount: 78,
        careTypes: ["Independent Living"],
        amenities: ["Fitness Center", "Swimming Pool", "Golf Course", "Dining Room", "Concierge"],
        roomTypes: ["Studio Apartment", "One Bedroom", "Two Bedroom"],
        bedAvailability: "Available Now",
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        featured: false,
        petFriendly: true,
        wheelchairAccessible: true,
        medicalStaff24_7: false,
      }
    ];

    sampleCareHomes.forEach(careHome => {
      this.careHomes.set(careHome.id, careHome);
      this.currentCareHomeId = Math.max(this.currentCareHomeId, careHome.id + 1);
    });
  }

  async getCareHome(id: number): Promise<CareHome | undefined> {
    return this.careHomes.get(id);
  }

  async getCareHomes(filters: SearchFilters): Promise<{ careHomes: CareHome[]; total: number }> {
    let results = Array.from(this.careHomes.values());

    // Apply keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(careHome => 
        careHome.name.toLowerCase().includes(keyword) ||
        careHome.description.toLowerCase().includes(keyword) ||
        careHome.amenities.some(amenity => amenity.toLowerCase().includes(keyword)) ||
        careHome.careTypes.some(type => type.toLowerCase().includes(keyword))
      );
    }

    // Apply location filter (simple city matching for now)
    if (filters.location) {
      const location = filters.location.toLowerCase();
      results = results.filter(careHome => 
        careHome.city.toLowerCase().includes(location) ||
        careHome.state.toLowerCase().includes(location) ||
        careHome.zipCode.includes(location)
      );
    }

    // Apply care type filter
    if (filters.careTypes && filters.careTypes.length > 0) {
      results = results.filter(careHome =>
        filters.careTypes!.some(type => careHome.careTypes.includes(type))
      );
    }

    // Apply bed availability filter
    if (filters.bedAvailability && filters.bedAvailability.length > 0) {
      results = results.filter(careHome =>
        filters.bedAvailability!.includes(careHome.bedAvailability)
      );
    }

    // Apply amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter(careHome =>
        filters.amenities!.every(amenity => careHome.amenities.includes(amenity))
      );
    }

    // Apply room types filter
    if (filters.roomTypes && filters.roomTypes.length > 0) {
      results = results.filter(careHome =>
        filters.roomTypes!.some(type => careHome.roomTypes.includes(type))
      );
    }

    // Apply price range filter
    if (filters.minPrice !== undefined) {
      results = results.filter(careHome => parseFloat(careHome.startingPrice) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter(careHome => parseFloat(careHome.startingPrice) <= filters.maxPrice!);
    }

    // Apply rating filter
    if (filters.minRating !== undefined) {
      results = results.filter(careHome => parseFloat(careHome.rating) >= filters.minRating!);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_low":
          results.sort((a, b) => parseFloat(a.startingPrice) - parseFloat(b.startingPrice));
          break;
        case "price_high":
          results.sort((a, b) => parseFloat(b.startingPrice) - parseFloat(a.startingPrice));
          break;
        case "distance":
          results.sort((a, b) => parseFloat(a.distance || "0") - parseFloat(b.distance || "0"));
          break;
        case "rating":
          results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        case "availability":
          const availabilityOrder = { "Available Now": 0, "Limited Availability": 1, "Waitlist Only": 2 };
          results.sort((a, b) => (availabilityOrder[a.bedAvailability as keyof typeof availabilityOrder] || 3) - (availabilityOrder[b.bedAvailability as keyof typeof availabilityOrder] || 3));
          break;
        default: // recommended
          results.sort((a, b) => {
            // Sort by featured first, then by rating
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return parseFloat(b.rating) - parseFloat(a.rating);
          });
      }
    }

    const total = results.length;
    const offset = (filters.page - 1) * filters.limit;
    const paginatedResults = results.slice(offset, offset + filters.limit);

    return { careHomes: paginatedResults, total };
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date().toISOString(),
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
