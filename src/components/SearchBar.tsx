import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, X } from 'lucide-react';

interface SearchResult {
  entity: {
    id: string;
    slug: string;
    label: string;
    type: string;
    summary?: string;
  };
  score: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const res = await fetch(
          `${apiUrl}/api/search?q=${encodeURIComponent(query)}&limit=5`
        );
        if (!res.ok) throw new Error('Search failed');
        const data: SearchResult[] = await res.json();
        setResults(data);
        setIsOpen(data.length > 0);
        setSelectedIndex(-1);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        setResults([]);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (slug: string) => {
    navigate(`/entity/${slug}`);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelect(results[selectedIndex].entity.slug);
      } else if (results.length > 0) {
        handleSelect(results[0].entity.slug);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="relative flex items-center bg-white/90 border border-navy-800/15 rounded-2xl focus-within:border-forest-500/60 focus-within:ring-2 focus-within:ring-forest-400/20 transition-all duration-300 shadow-soft">
        <Search className="w-5 h-5 text-navy-700/70 ml-4 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0 || loading || error) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Explore anything..."
          className="flex-1 bg-transparent px-4 py-3.5 sm:py-4 text-navy-900 placeholder-navy-700/50 focus:outline-none font-sans text-sm sm:text-base min-w-0"
          aria-label="Search knowledge graph"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              setError(null);
              inputRef.current?.focus();
            }}
            className="p-2 text-navy-700/60 hover:text-navy-900 transition-colors mr-1"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 sm:left-0 sm:right-0 mt-2 bg-white border border-navy-800/10 rounded-2xl shadow-lift overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {loading && (
              <div className="flex items-center justify-center p-6 text-navy-700/70">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Searching...
              </div>
            )}

            {!loading && error && (
              <div className="p-6 text-center text-navy-700/70">
                <p className="text-red-500 text-sm">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsOpen(false);
                  }}
                  className="mt-2 text-xs text-forest-600 hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {!loading && !error && results.length === 0 && query.length >= 2 && (
              <div className="p-6 text-center text-navy-700/70 text-sm">
                No results found for "<span className="text-navy-900">{query}</span>"
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <ul role="listbox" className="py-2">
                {results.map((result, index) => (
                  <li
                    key={result.entity.id}
                    role="option"
                    aria-selected={index === selectedIndex}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === selectedIndex
                        ? 'bg-forest-500/10 border-l-2 border-forest-500'
                        : 'border-l-2 border-transparent hover:bg-cream-100'
                    }`}
                    onClick={() => handleSelect(result.entity.slug)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-navy-900 font-medium break-words">
                        {result.entity.label}
                      </span>
                      <span className="text-xs text-forest-700 bg-forest-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        {result.entity.type}
                      </span>
                    </div>
                    {result.entity.summary && (
                      <p className="text-sm text-navy-700/70 mt-1 line-clamp-2 break-words">
                        {result.entity.summary}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}