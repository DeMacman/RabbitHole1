import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

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

function GraphNode({ data, selected }: NodeProps) {
  const color = typeColors[data.type as string] || '#7C3AED';

  return (
    <div
      className={`
        relative px-4 py-2 rounded-xl border bg-[#0F0F10] backdrop-blur-sm
        transition-all duration-300 cursor-pointer
        ${selected ? 'border-[#7C3AED] shadow-lg shadow-[#7C3AED]/30' : 'border-[rgba(255,255,255,0.08)]'}
        hover:border-[#7C3AED]/50 hover:shadow-lg
      `}
      title={`${data.label}\n${data.summary || data.type}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-[#7C3AED]" />
      <Handle type="source" position={Position.Bottom} className="!bg-[#7C3AED]" />
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-white text-sm font-medium">{data.label}</span>
      </div>
      <div className="text-xs text-[#A1A1AA] mt-1">{data.type}</div>
    </div>
  );
}

export default memo(GraphNode);