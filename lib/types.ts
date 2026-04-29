export type PricingType = "Free" | "Freemium" | "Paid";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Tool = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  pricingType: PricingType;
  startingPrice?: string;
  rating: number;
  shortDescription: string;
  longDescription: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  tags: string[];
  websiteUrl: string;
  isEditorsPick: boolean;
  isHot: boolean;
  alternatives: string[];
};

export type Guide = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: string;
  readingTime: string;
  publishedAt: string;
};
