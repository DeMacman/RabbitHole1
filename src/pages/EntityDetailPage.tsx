import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, BookOpen, Tag } from 'lucide-react';
import GraphCanvas from '../components/graph/GraphCanvas';
import GraphLegend from '../components/graph/GraphLegend';
import GraphLoading from '../components/graph/GraphLoading';

interface Entity {
  id: string;
  slug: string;
  label: string;
  type: string;
  description?: string;
  summary?: string;
  image?: string;
  banner?: string;
  aliases: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  wikipediaUrl?: string;
  officialWebsite?: string;
  socialLinks: Record<string, string>;
}

interface GraphData {
  center: Entity;
  nodes: Entity[];
  edges: any[];
}

export default function EntityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${apiUrl}/api/entities/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Entity not found');
        return res.json();
      })
      .then((data) => setEntity(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, apiUrl]);

  useEffect(() => {
    if (!slug) return;
    setGraphLoading(true);
    fetch(`${apiUrl}/api/entities/${slug}/graph`)
      .then((res) => {
        if (!res.ok) throw new Error('Graph not available');
        return res.json();
      })
      .then((data) => setGraph(data))
      .catch(() => setGraph(null))
      .finally(() => setGraphLoading(false));
  }, [slug, apiUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center text-navy-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600" />
      </div>
    );
  }

  if (error || !entity) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center text-navy-900">
        <div className="text-center">
          <p className="text-xl text-red-500">Entity not found</p>
          <a href="/" className="mt-4 inline-flex items-center text-forest-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to search
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 text-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <a
          href="/"
          className="inline-flex items-center text-navy-700/70 hover:text-forest-700 mb-6 sm:mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to search
        </a>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {/* Editorial header */}
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-forest-600 mb-2">
              {entity.type}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-navy-900 leading-tight mb-4 break-words">
              {entity.label}
            </h1>
            <p className="text-base sm:text-lg text-navy-700/80 leading-relaxed max-w-3xl break-words">
              {entity.summary || entity.description}
            </p>
          </div>

          {/* External links */}
          <div className="flex flex-wrap gap-4 mt-6 mb-10">
            {entity.wikipediaUrl && (
              <a
                href={entity.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-forest-600 hover:text-forest-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Wikipedia
                <ExternalLink className="w-3 h-3 text-navy-700/50" />
              </a>
            )}
            {entity.officialWebsite && (
              <a
                href={entity.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-forest-600 hover:text-forest-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Official Website
                <ExternalLink className="w-3 h-3 text-navy-700/50" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Main content: left info, right graph */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 items-start mt-4">
          {/* Left: details and information */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white border border-navy-800/10 rounded-card p-6 shadow-soft">
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy-900 mb-4">
                Details
              </h2>
              <dl className="space-y-3 text-sm text-navy-700/80">
                <div>
                  <dt className="text-navy-700/50 uppercase text-xs tracking-wide">Type</dt>
                  <dd className="mt-0.5">{entity.type}</dd>
                </div>
                <div>
                  <dt className="text-navy-700/50 uppercase text-xs tracking-wide">Created</dt>
                  <dd className="mt-0.5">{new Date(entity.createdAt).toLocaleDateString()}</dd>
                </div>
                {entity.tags.length > 0 && (
                  <div>
                    <dt className="text-navy-700/50 uppercase text-xs tracking-wide mb-2">Tags</dt>
                    <dd className="flex flex-wrap gap-2">
                      {entity.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cream-100 border border-navy-800/10 text-xs text-navy-700"
                        >
                          <Tag className="w-3 h-3 text-forest-600" />
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {entity.socialLinks && Object.keys(entity.socialLinks).length > 0 && (
                  <div>
                    <dt className="text-navy-700/50 uppercase text-xs tracking-wide mb-2">Social</dt>
                    <dd className="space-y-1">
                      {Object.entries(entity.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-forest-600 hover:text-forest-700 hover:underline break-words"
                        >
                          {platform}
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </motion.div>

          {/* Right: knowledge graph */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="w-full min-w-0"
          >
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy-900 mb-4">
              Interactive Knowledge Graph
            </h2>
            {graphLoading ? (
              <GraphLoading />
            ) : graph ? (
              <>
                <GraphLegend />
                <div className="mt-4">
                  <GraphCanvas data={graph} />
                </div>
              </>
            ) : (
              <div className="p-6 sm:p-8 bg-white border border-navy-800/10 rounded-card text-center text-navy-700/70">
                No connections found for this entity.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}