const typeColors: Record<string, string> = {
  Person: '#F59E0B',
  Company: '#3B82F6',
  Technology: '#8B5CF6',
  Concept: '#EC4899',
  Organization: '#10B981',
  Book: '#EF4444',
  Movie: '#F97316',
  Country: '#6366F1',
  City: '#14B8A6',
  University: '#06B6D4',
  'Programming Language': '#84CC16',
  Paper: '#EAB308',
  'Historical Event': '#DC2626',
  'Space Mission': '#7C3AED',
};

export default function GraphLegend() {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-xl">
      {Object.entries(typeColors).map(([type, color]) => (
        <div key={type} className="flex items-center gap-1.5 text-xs text-[#A1A1AA]">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          {type}
        </div>
      ))}
    </div>
  );
}