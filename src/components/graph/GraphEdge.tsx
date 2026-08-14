import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

export default function GraphEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Cast edge data to retrieve the relationship label
  const label = (data as unknown as { label?: string })?.label;

  return (
    <>
      <BaseEdge id={id} path={edgePath} className="!stroke-[#7C3AED]/30" />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="absolute px-2 py-0.5 rounded-full bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] text-xs text-[#A1A1AA] pointer-events-none"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}