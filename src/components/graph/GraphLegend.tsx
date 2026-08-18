const typeColors: Record<string, string> = {
  Person: '#c47a4f',
  Company: '#3e6a4f',
  Technology: '#685391',
  Concept: '#8069ad',
  Organization: '#3e7c7b',
  Book: '#b4564b',
  Movie: '#c47a4f',
  Country: '#5d856d',
  City: '#3e7c7b',
  University: '#2e543e',
  'Programming Language': '#685391',
  Paper: '#8069ad',
  'Historical Event': '#b4564b',
  'Space Mission': '#23422f',
};

export default function GraphLegend() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-navy-800/10 rounded-card max-w-full overflow-x-auto">
      {Object.entries(typeColors).map(([type, color]) => (
        <div
          key={type}
          className="flex items-center gap-1.5 text-[10px] sm:text-xs text-navy-700/70 whitespace-nowrap"
        >
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          {type}
        </div>
      ))}
    </div>
  );
}