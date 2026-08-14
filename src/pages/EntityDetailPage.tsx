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

  const apiUrl =
    import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    fetch(`${apiUrl}/api/entities/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Entity not found');
        }

        return res.json();
      })
      .then((data) => {
        setEntity(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, apiUrl]);

  useEffect(() => {
    if (!slug) return;

    setGraphLoading(true);

    fetch(`${apiUrl}/api/entities/${slug}/graph`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Graph not available');
        }

        return res.json();
      })
      .then((data) => {
        setGraph(data);
      })
      .catch(() => {
        setGraph(null);
      })
      .finally(() => {
        setGraphLoading(false);
      });
  }, [slug, apiUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C3AED]" />
      </div>
    );
  }

  if (error || !entity) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white px-4">
        <div className="text-center">
          <p className="text-xl text-red-400">
            Entity not found
          </p>

          <a
            href="/"
            className="mt-4 inline-flex items-center text-[#7C3AED] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Back button */}
        <a
          href="/"
          className="inline-flex items-center text-[#A1A1AA] hover:text-white mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to search
        </a>

        {/* Entity Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 break-words">
            {entity.label}
          </h1>

          {(entity.summary || entity.description) && (
            <p className="text-base sm:text-lg text-[#A1A1AA] mb-6 break-words leading-relaxed">
              {entity.summary || entity.description}
            </p>
          )}

          {/* External links */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
            {entity.wikipediaUrl && (
              <a
                href={entity.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-[#7C3AED] hover:underline"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Wikipedia
              </a>
            )}

            {entity.officialWebsite && (
              <a
                href={entity.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-[#7C3AED] hover:underline"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Website
              </a>
            )}
          </div>
        </motion.div>

        {/* Interactive Knowledge Graph */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 sm:mt-16"
        >
          <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">
            Interactive Knowledge Graph
          </h2>

          {graphLoading ? (
            <GraphLoading />
          ) : graph ? (
            <>
              <GraphLegend />

              <div className="mt-4 w-full min-w-0 overflow-hidden">
                <GraphCanvas data={graph} />
              </div>
            </>
          ) : (
            <div className="p-6 sm:p-8 bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-2xl text-center text-[#A1A1AA]">
              No connections found for this entity.
            </div>
          )}
        </motion.section>

        {/* Details */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12 sm:mt-16">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">
              Details
            </h2>

            <div className="space-y-3 sm:space-y-4 text-sm text-[#A1A1AA]">

              {/* Tags */}
              {entity.tags.length > 0 && (
                <div className="flex items-start gap-2 flex-wrap">
                  <Tag className="w-4 h-4 flex-shrink-0 mt-0.5" />

                  <span className="break-words">
                    {entity.tags.join(', ')}
                  </span>
                </div>
              )}

              {/* Type */}
              <p className="break-words">
                Type: {entity.type}
              </p>

              {/* Created */}
              <p>
                Created:{' '}
                {new Date(entity.createdAt).toLocaleDateString()}
              </p>

              {/* Social links */}
              {entity.socialLinks &&
                Object.keys(entity.socialLinks).length > 0 && (
                  <div>
                    <p className="mb-1">
                      Social:
                    </p>

                    {Object.entries(entity.socialLinks).map(
                      ([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-[#7C3AED] hover:underline break-words"
                        >
                          {platform}
                        </a>
                      )
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}