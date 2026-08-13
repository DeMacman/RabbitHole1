import { getSession } from '../database/neo4j';
import logger from '../utils/logger';

const entities = [
  {
    id: 'elon-musk', slug: 'elon-musk', label: 'Elon Musk', type: 'Person',
    description: 'CEO of Tesla and SpaceX, co‑founder of OpenAI.',
    summary: 'Entrepreneur and business magnate.',
    aliases: ['Musk'], tags: ['entrepreneur', 'space', 'electric vehicles'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Elon_Musk',
    officialWebsite: null, socialLinks: { twitter: 'https://twitter.com/elonmusk' },
    metadata: {},
  },
  {
    id: 'tesla', slug: 'tesla', label: 'Tesla, Inc.', type: 'Company',
    description: 'Electric vehicle and clean energy company.',
    summary: 'Leading EV manufacturer.',
    aliases: ['Tesla Motors'], tags: ['automotive', 'energy', 'electric'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tesla,_Inc.',
    officialWebsite: 'https://www.tesla.com', socialLinks: {},
    metadata: {},
  },
  {
    id: 'spacex', slug: 'spacex', label: 'SpaceX', type: 'Company',
    description: 'Aerospace manufacturer and space transportation company.',
    summary: 'Pioneer in reusable rockets.',
    aliases: ['Space Exploration Technologies Corp.'], tags: ['space', 'rockets', 'Mars'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/SpaceX',
    officialWebsite: 'https://www.spacex.com', socialLinks: { twitter: 'https://twitter.com/spacex' },
    metadata: {},
  },
  {
    id: 'openai', slug: 'openai', label: 'OpenAI', type: 'Organization',
    description: 'AI research laboratory.',
    summary: 'Creators of ChatGPT and GPT‑4.',
    aliases: [], tags: ['AI', 'research', 'language models'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/OpenAI',
    officialWebsite: 'https://openai.com', socialLinks: { twitter: 'https://twitter.com/openai' },
    metadata: {},
  },
  {
    id: 'chatgpt', slug: 'chatgpt', label: 'ChatGPT', type: 'Technology',
    description: 'Conversational AI model by OpenAI.',
    summary: 'State‑of‑the‑art chatbot.',
    aliases: ['ChatGPT-4'], tags: ['AI', 'NLP', 'chatbot'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/ChatGPT',
    officialWebsite: 'https://chat.openai.com', socialLinks: {},
    metadata: {},
  },
  {
    id: 'gpt-4', slug: 'gpt-4', label: 'GPT‑4', type: 'Technology',
    description: 'Fourth generation of OpenAI\'s GPT.',
    summary: 'Multimodal large language model.',
    aliases: ['GPT4'], tags: ['AI', 'language model', 'deep learning'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/GPT-4',
    officialWebsite: null, socialLinks: {},
    metadata: {},
  },
  {
    id: 'microsoft', slug: 'microsoft', label: 'Microsoft', type: 'Company',
    description: 'Multinational technology corporation.',
    summary: 'Develops Windows, Office, Azure.',
    aliases: ['MSFT'], tags: ['software', 'cloud', 'AI'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Microsoft',
    officialWebsite: 'https://www.microsoft.com', socialLinks: { twitter: 'https://twitter.com/microsoft' },
    metadata: {},
  },
  {
    id: 'google', slug: 'google', label: 'Google', type: 'Company',
    description: 'Search engine and technology company.',
    summary: 'Alphabet subsidiary.',
    aliases: ['Alphabet Inc.'], tags: ['search', 'AI', 'cloud'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Google',
    officialWebsite: 'https://www.google.com', socialLinks: {},
    metadata: {},
  },
  {
    id: 'deepmind', slug: 'deepmind', label: 'DeepMind', type: 'Company',
    description: 'British AI research lab.',
    summary: 'Known for AlphaGo and AlphaFold.',
    aliases: ['Google DeepMind'], tags: ['AI', 'research', 'reinforcement learning'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/DeepMind',
    officialWebsite: 'https://www.deepmind.com', socialLinks: { twitter: 'https://twitter.com/deepmind' },
    metadata: {},
  },
  {
    id: 'nvidia', slug: 'nvidia', label: 'NVIDIA', type: 'Company',
    description: 'GPU designer.',
    summary: 'Leader in AI hardware.',
    aliases: ['NVIDIA Corporation'], tags: ['GPU', 'AI', 'hardware'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Nvidia',
    officialWebsite: 'https://www.nvidia.com', socialLinks: {},
    metadata: {},
  },
  {
    id: 'sam-altman', slug: 'sam-altman', label: 'Sam Altman', type: 'Person',
    description: 'CEO of OpenAI.',
    summary: 'Entrepreneur and investor.',
    aliases: ['Samuel H. Altman'], tags: ['AI', 'startups'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sam_Altman',
    officialWebsite: null, socialLinks: { twitter: 'https://twitter.com/sama' },
    metadata: {},
  },
  {
    id: 'artificial-intelligence', slug: 'artificial-intelligence', label: 'Artificial Intelligence', type: 'Concept',
    description: 'Intelligence demonstrated by machines.',
    summary: 'Broad field of computer science.',
    aliases: ['AI', 'machine intelligence'], tags: ['AI', 'technology', 'future'],
    image: null, banner: null,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    officialWebsite: null, socialLinks: {},
    metadata: {},
  },
];

const relationships = [
  { source: 'elon-musk', target: 'tesla', type: 'CEO_OF', weight: 1, confidence: 1 },
  { source: 'elon-musk', target: 'spacex', type: 'CEO_OF', weight: 1, confidence: 1 },
  { source: 'elon-musk', target: 'openai', type: 'CO_FOUNDER', weight: 0.9, confidence: 0.9 },
  { source: 'sam-altman', target: 'openai', type: 'CEO_OF', weight: 1, confidence: 1 },
  { source: 'microsoft', target: 'openai', type: 'INVESTOR_IN', weight: 0.8, confidence: 0.95 },
  { source: 'nvidia', target: 'openai', type: 'SUPPLIER_TO', weight: 0.7, confidence: 0.8 },
  { source: 'google', target: 'deepmind', type: 'PARENT_OF', weight: 1, confidence: 1 },
  { source: 'openai', target: 'chatgpt', type: 'CREATED', weight: 1, confidence: 1 },
  { source: 'openai', target: 'gpt-4', type: 'CREATED', weight: 1, confidence: 1 },
  { source: 'deepmind', target: 'artificial-intelligence', type: 'RESEARCHES', weight: 0.9, confidence: 0.9 },
  { source: 'chatgpt', target: 'artificial-intelligence', type: 'IS_A', weight: 1, confidence: 1 },
  { source: 'gpt-4', target: 'artificial-intelligence', type: 'IS_A', weight: 1, confidence: 1 },
];

export async function seedDatabase(): Promise<void> {
  const session = getSession();
  try {
    for (const entity of entities) {
      await session.run(
        `MERGE (e:Entity {id: $id})
         ON CREATE SET
           e.slug = $slug,
           e.label = $label,
           e.type = $type,
           e.description = $description,
           e.summary = $summary,
           e.aliases = $aliases,
           e.tags = $tags,
           e.image = $image,
           e.banner = $banner,
           e.wikipediaUrl = $wikipediaUrl,
           e.officialWebsite = $officialWebsite,
           e.socialLinks = $socialLinks,
           e.metadata = $metadata,
           e.createdAt = datetime(),
           e.updatedAt = datetime()
         ON MATCH SET
           e.slug = $slug,
           e.label = $label,
           e.type = $type`,
        {
          id: entity.id, slug: entity.slug, label: entity.label, type: entity.type,
          description: entity.description || null, summary: entity.summary || null,
          aliases: entity.aliases, tags: entity.tags,
          image: entity.image || null, banner: entity.banner || null,
          wikipediaUrl: entity.wikipediaUrl || null, officialWebsite: entity.officialWebsite || null,
          socialLinks: JSON.stringify(entity.socialLinks), metadata: '{}',
        }
      );
    }

    for (const rel of relationships) {
      await session.run(
        `MATCH (s:Entity {id: $source}), (t:Entity {id: $target})
         MERGE (s)-[r:RELATES {relationshipType: $relationshipType}]->(t)
         ON CREATE SET
           r.id = randomUUID(),
           r.weight = $weight,
           r.confidence = $confidence,
           r.sourceReferences = [],
           r.description = null,
           r.createdAt = datetime(),
           r.updatedAt = datetime(),
           r.metadata = '{}'
         ON MATCH SET
           r.weight = $weight,
           r.confidence = $confidence`,
        { source: rel.source, target: rel.target, relationshipType: rel.type, weight: rel.weight, confidence: rel.confidence }
      );
    }
    logger.info('Seed data inserted successfully');
  } catch (error) {
    logger.error(error, 'Seed error');
    throw error;
  } finally {
    session.close();
  }
}