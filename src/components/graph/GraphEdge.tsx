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

  const label = (data as unknown as { label?: string })?.label;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className="!stroke-forest-500/25"
        style={{ strokeWidth: 1.5 }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="absolute px-2 py-0.5 rounded-full bg-white border border-navy-800/10 text-[10px] sm:text-xs text-navy-700/60 pointer-events-none shadow-sm"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}