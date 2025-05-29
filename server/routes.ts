import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchFiltersSchema, insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get care homes with filters
  app.get("/api/care-homes", async (req, res) => {
    try {
      const filters = searchFiltersSchema.parse({
        location: req.query.location,
        careTypes: req.query.careTypes ? (Array.isArray(req.query.careTypes) ? req.query.careTypes : [req.query.careTypes]) : undefined,
        bedAvailability: req.query.bedAvailability ? (Array.isArray(req.query.bedAvailability) ? req.query.bedAvailability : [req.query.bedAvailability]) : undefined,
        amenities: req.query.amenities ? (Array.isArray(req.query.amenities) ? req.query.amenities : [req.query.amenities]) : undefined,
        roomTypes: req.query.roomTypes ? (Array.isArray(req.query.roomTypes) ? req.query.roomTypes : [req.query.roomTypes]) : undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
        keyword: req.query.keyword,
        sortBy: req.query.sortBy,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12,
      });

      const result = await storage.getCareHomes(filters);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid filter parameters", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single care home
  app.get("/api/care-homes/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid care home ID" });
      }

      const careHome = await storage.getCareHome(id);
      if (!careHome) {
        return res.status(404).json({ message: "Care home not found" });
      }

      res.json(careHome);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      
      // Verify care home exists
      const careHome = await storage.getCareHome(inquiryData.careHomeId);
      if (!careHome) {
        return res.status(404).json({ message: "Care home not found" });
      }

      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
