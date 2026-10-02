import React from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  type Node,
  type Edge,
  type OnConnect,
  type NodeProps,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PlayIcon from "../../../assets/icons/PlayIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import MinusCircleIcon from "../../../assets/icons/MinusCircleIcon";

const getCSSVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

type WorkflowNodeType = "start" | "process" | "decision" | "end";

export interface WorkflowNodeData {
  label: string;
  type: WorkflowNodeType;
  description?: string;
  [key: string]: unknown;
}

interface WorkflowEditorProps {
  id?: string;
  label?: string;
  initialNodes?: Node<WorkflowNodeData>[];
  initialEdges?: Edge[];
  onChange?: (nodes: Node<WorkflowNodeData>[], edges: Edge[]) => void;
  height?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  showMiniMap?: boolean;
  showControls?: boolean;
}

const nodeColorMap: Record<WorkflowNodeType, string> = {
  start: "wf-node-start",
  process: "wf-node-process",
  decision: "wf-node-decision",
  end: "wf-node-end",
};

const nodeIconMap: Record<WorkflowNodeType, React.ReactNode> = {
  start: <PlayIcon className="w-4 h-4" />,
  process: <SettingsIcon className="w-4 h-4" />,
  decision: <HelpCircleIcon className="w-4 h-4" />,
  end: <MinusCircleIcon className="w-4 h-4" />,
};

const CustomNode: React.FC<NodeProps<Node<WorkflowNodeData>>> = ({ data }) => {
  const nodeType = data.type || "process";
  const nodeClass = nodeColorMap[nodeType];

  return (
    <div className={`px-4 py-3 rounded-lg border-2 shadow-sm min-w-[150px] ${nodeClass}`}>
      {nodeType !== "start" && (
        <Handle type="target" position={Position.Top} className="!w-3 !h-3 wf-handle" />
      )}
      <div className="flex items-center gap-2">
        <span>{nodeIconMap[nodeType]}</span>
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs wf-node-desc mt-0.5">{data.description}</div>
          )}
        </div>
      </div>
      {nodeType !== "end" && (
        <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 wf-handle" />
      )}
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const defaultSampleNodes: Node<WorkflowNodeData>[] = [
  { id: "1", type: "custom", position: { x: 250, y: 0 }, data: { label: "Start", type: "start", description: "Begin workflow" } },
  { id: "2", type: "custom", position: { x: 250, y: 120 }, data: { label: "Process Data", type: "process", description: "Validate input" } },
  { id: "3", type: "custom", position: { x: 100, y: 250 }, data: { label: "Is Valid?", type: "decision", description: "Check conditions" } },
  { id: "4", type: "custom", position: { x: 400, y: 250 }, data: { label: "Transform", type: "process", description: "Apply changes" } },
  { id: "5", type: "custom", position: { x: 250, y: 400 }, data: { label: "End", type: "end", description: "Workflow complete" } },
];

const defaultSampleEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-3", source: "2", target: "3", label: "No", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-4", source: "2", target: "4", label: "Yes", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3-5", source: "3", target: "5", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e4-5", source: "4", target: "5", markerEnd: { type: MarkerType.ArrowClosed } },
];

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  id,
  label,
  initialNodes,
  initialEdges,
  onChange,
  height = "500px",
  disabled = false,
  error = false,
  errorMessage = "",
  containerClass = "",
  showMiniMap = true,
  showControls = true,
}) => {
  const [nodes, , onNodesChange] = useNodesState<Node<WorkflowNodeData>>(initialNodes || defaultSampleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || defaultSampleEdges);

  const onConnect: OnConnect = React.useCallback(
    (params) => {
      if (disabled) return;
      setEdges((eds) => addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
    },
    [disabled, setEdges],
  );

  React.useEffect(() => {
    onChange?.(nodes, edges);
  }, [nodes, edges]);

  const borderClass = error ? "wf-border-error" : "wf-border-default";

  return (
    <div id={id} className={`workflow-editor flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label className="text-sm font-medium wf-label">{label}</label>
      )}
      <div
        className={`rounded-lg border-2 overflow-hidden ${borderClass} ${disabled ? "opacity-60 pointer-events-none" : ""}`}
        style={{ height }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={disabled ? undefined : onNodesChange}
          onEdgesChange={disabled ? undefined : onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="workflow-flow-area"
        >
          {showControls && <Controls />}
          {showMiniMap && (
            <MiniMap
              nodeColor={(node) => {
                const data = node.data as WorkflowNodeData;
                switch (data.type) {
                  case "start": return getCSSVar("--wf-node-start");
                  case "process": return getCSSVar("--wf-node-process");
                  case "decision": return getCSSVar("--wf-node-decision");
                  case "end": return getCSSVar("--wf-node-end");
                  default: return getCSSVar("--wf-node-default");
                }
              }}
              maskColor={getCSSVar("--wf-minimap-mask")}
            />
          )}
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} color={getCSSVar("--wf-bg-dots")} />
        </ReactFlow>
      </div>
      {error && errorMessage && (
        <span className="wf-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default WorkflowEditor;
