import { pgTable, text, serial, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const careHomes = pgTable("care_homes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  
  // Pricing
  startingPrice: decimal("starting_price").notNull(),
  priceDescription: text("price_description").notNull(),
  
  // Location
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  distance: decimal("distance"), // calculated field for search results
  
  // Ratings
  rating: decimal("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  
  // Care levels offered
  careTypes: text("care_types").array().notNull(), // ["Independent Living", "Assisted Living", "Memory Care", "Skilled Nursing"]
  
  // Amenities
  amenities: text("amenities").array().notNull(),
  
  // Room types
  roomTypes: text("room_types").array().notNull(), // ["Private Room", "Semi-Private", "Studio Apartment", "One Bedroom"]
  
  // Bed availability status
  bedAvailability: text("bed_availability").notNull(), // "Available Now", "Limited Availability", "Waitlist Only"
  
  // Images
  images: text("images").array().notNull(),
  
  // Additional metadata
  featured: boolean("featured").default(false),
  petFriendly: boolean("pet_friendly").default(false),
  wheelchairAccessible: boolean("wheelchair_accessible").default(false),
  medicalStaff24_7: boolean("medical_staff_24_7").default(false),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  careHomeId: integer("care_home_id").references(() => careHomes.id).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  createdAt: text("created_at").notNull(),
});

export const insertCareHomeSchema = createInsertSchema(careHomes).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export type CareHome = typeof careHomes.$inferSelect;
export type InsertCareHome = z.infer<typeof insertCareHomeSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

// Search and filter schemas
export const searchFiltersSchema = z.object({
  location: z.string().optional(),
  careTypes: z.array(z.string()).optional(),
  bedAvailability: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  roomTypes: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minRating: z.number().optional(),
  keyword: z.string().optional(),
  sortBy: z.enum(["recommended", "price_low", "price_high", "distance", "rating", "availability"]).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;
