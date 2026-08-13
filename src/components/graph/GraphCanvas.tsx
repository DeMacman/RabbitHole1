import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNavigate } from 'react-router-dom';
import GraphNode from './GraphNode';
import GraphEdge from './GraphEdge';

interface Entity {
  id: string;
  slug: string;
  label: string;
  type: string;
  summary?: string;
}

interface RelationshipEdge {
  id: string;
  source: string;
  target: string;
  relationshipType: string;
  weight: number;
  confidence: number;
}

interface GraphData {
  center: Entity;
  nodes: Entity[];
  edges: RelationshipEdge[];
}

const nodeTypes = { custom: GraphNode };
const edgeTypes = { custom: GraphEdge };

export default function GraphCanvas({ data }: { data: GraphData }) {
  const navigate = useNavigate();

  const initialNodes: Node[] = useMemo(() => {
    const centerNode: Node = {
      id: data.center.id,
      type: 'custom',
      position: { x: 400, y: 300 },
      data: { label: data.center.label, type: data.center.type, summary: data.center.summary },
    };

    const neighborNodes: Node[] = data.nodes
      .filter((n) => n.id !== data.center.id)
      .map((entity, index, filtered) => {
        const angle = (2 * Math.PI * index) / filtered.length;
        const radius = 250;
        return {
          id: entity.id,
          type: 'custom',
          position: {
            x: 400 + radius * Math.cos(angle),
            y: 300 + radius * Math.sin(angle),
          },
          data: { label: entity.label, type: entity.type, summary: entity.summary },
        };
      });

    return [centerNode, ...neighborNodes];
  }, [data]);

  const initialEdges: Edge[] = useMemo(() => {
    return data.edges.map((rel) => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: 'custom',
      data: { label: rel.relationshipType },
      animated: false,
    }));
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const entity = data.nodes.find((e) => e.id === node.id);
      if (entity?.slug) {
        navigate(`/entity/${entity.slug}`);
      }
    },
    [navigate, data]
  );

  return (
    <div className="w-full h-[500px] bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255,255,255,0.03)" gap={20} />
        <Controls className="!bg-[#0F0F10] !border-[rgba(255,255,255,0.08)] !text-white !fill-white" />
      </ReactFlow>
    </div>
  );
}