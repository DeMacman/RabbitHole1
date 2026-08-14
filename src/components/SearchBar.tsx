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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/search?q=${encodeURIComponent(query)}&limit=5`
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
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative flex items-center bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-xl focus-within:border-[#7C3AED]/50 transition-all duration-300">
        <Search className="w-5 h-5 text-[#A1A1AA] ml-4 flex-shrink-0" />
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
          className="flex-1 bg-transparent px-4 py-4 text-white placeholder-[#A1A1AA] focus:outline-none font-sans text-base min-w-0"
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
            className="p-2 text-[#A1A1AA] hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center p-6 text-[#A1A1AA]">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Searching...
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="p-6 text-center text-[#A1A1AA]">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsOpen(false);
                  }}
                  className="mt-2 text-xs text-[#7C3AED] hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Empty results */}
            {!loading && !error && results.length === 0 && query.length >= 2 && (
              <div className="p-6 text-center text-[#A1A1AA] text-sm">
                No results found for "<span className="text-white">{query}</span>"
              </div>
            )}

            {/* Results list */}
            {!loading && !error && results.length > 0 && (
              <ul role="listbox" className="py-2">
                {results.map((result, index) => (
                  <li
                    key={result.entity.id}
                    role="option"
                    aria-selected={index === selectedIndex}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === selectedIndex
                        ? 'bg-[#7C3AED]/20 border-l-2 border-[#7C3AED]'
                        : 'border-l-2 border-transparent hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                    onClick={() => handleSelect(result.entity.slug)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">
                        {result.entity.label}
                      </span>
                      <span className="text-xs text-[#A1A1AA] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-full">
                        {result.entity.type}
                      </span>
                    </div>
                    {result.entity.summary && (
                      <p className="text-sm text-[#A1A1AA] mt-1 line-clamp-1">
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