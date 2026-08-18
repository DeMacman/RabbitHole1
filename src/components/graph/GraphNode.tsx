import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

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

function GraphNode({ data, selected }: NodeProps) {
  const { label, type, summary } = data as unknown as {
    label: string;
    type: string;
    summary?: string;
  };

  const color = typeColors[type] || '#3e6a4f';

  return (
    <div
      className={`
        relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border bg-white
        transition-all duration-300 cursor-pointer
        max-w-[180px] sm:max-w-[220px]
        ${selected ? 'border-forest-500 shadow-lift' : 'border-navy-800/10'}
        hover:border-forest-400 hover:shadow-soft
      `}
      title={`${label}\n${summary || type}`}
      style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
    >
      <Handle type="target" position={Position.Top} className="!bg-forest-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-forest-400" />

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="text-navy-900 text-xs sm:text-sm font-medium truncate">
          {label}
        </span>
      </div>
      <div className="text-[10px] sm:text-xs text-navy-700/60 mt-0.5 sm:mt-1 truncate">
        {type}
      </div>
    </div>
  );
}

export default memo(GraphNode);