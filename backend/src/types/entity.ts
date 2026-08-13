export type EntityType = 
  | 'Person'
  | 'Company'
  | 'Technology'
  | 'Concept'
  | 'Book'
  | 'Movie'
  | 'Country'
  | 'City'
  | 'University'
  | 'Programming Language'
  | 'Paper'
  | 'Historical Event'
  | 'Organization'
  | 'Space Mission';

export interface Entity {
  id: string;
  slug: string;
  label: string;
  type: EntityType;
  description?: string;
  summary?: string;
  image?: string;
  banner?: string;
  aliases: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
  wikipediaUrl?: string;
  officialWebsite?: string;
  socialLinks: Record<string, string>;
}

export interface Relationship {
  id: string;
  source: string;
  target: string;
  relationshipType: string;
  weight: number;
  confidence: number;
  sourceReferences: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  publisher?: string;
  author?: string;
  publishedDate?: string;
  type: 'article' | 'book' | 'paper' | 'website' | 'video' | 'podcast' | 'other';
  confidence: number;
  metadata: Record<string, any>;
}

export interface TimelineEvent {
  id: string;
  entityId: string;
  eventType: 'Founded' | 'Born' | 'Released' | 'Discovered' | 'Published' | 'Updated' | 'Other';
  date: string;
  description?: string;
  metadata: Record<string, any>;
}

export interface SearchResult {
  entity: Entity;
  score: number;
}