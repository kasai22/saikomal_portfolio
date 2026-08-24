"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import {
  nodePoint,
  tierProgress,
  type SystemGeometry,
  type SystemNode,
} from "@/components/hero/complexity-geometry";

interface NodesProps {
  progress: MotionValue<number>;
  geometry: SystemGeometry;
  scatter: number;
  width: number;
  height: number;
}

/**
 * The system's objects: people, steps, services, surfaces.
 *
 * Each node travels from a scattered position, rotation and scale to its place
 * in one of four aligned rows. Nothing spins, drifts or pulses on its own — a
 * node moves only because the reader is moving it, and it stops when it
 * arrives. That is the difference between a diagram resolving and a particle
 * field.
 *
 * ── One value per node ──────────────────────────────────────────────────
 * Position, rotation and scale are composed into a single SVG `transform`
 * string by one `useTransform`, so a node costs one subscription rather than
 * four. Brightness is handled a tier at a time — four more values for eighteen
 * nodes — because the thing worth reading is a whole row coming into focus,
 * not eighteen independent fades.
 */
export function ComplexityNodes({ progress, geometry, scatter, width, height }: NodesProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0"
      aria-hidden="true"
      focusable="false"
    >
      {geometry.tiers.map((tier, index) => (
        <TierGroup
          key={tier.label}
          tier={index}
          y={tier.y * height}
          progress={progress}
          nodes={geometry.nodes.filter((node) => node.tier === index)}
          scatter={scatter}
          width={width}
          height={height}
          last={index === geometry.tiers.length - 1}
        />
      ))}
    </svg>
  );
}

interface TierGroupProps {
  progress: MotionValue<number>;
  tier: number;
  /** The row's baseline, in stage px. */
  y: number;
  nodes: SystemNode[];
  scatter: number;
  width: number;
  height: number;
  last: boolean;
}

function TierGroup({ progress, tier, y, nodes, scatter, width, height, last }: TierGroupProps) {
  // Scattered nodes read as background texture; resolved ones read as objects.
  const opacity = useTransform(progress, (value) => 0.55 + 0.45 * tierProgress(value, tier));
  // The row's baseline. Fades in late and stays faint — it is the evidence
  // that the nodes landed on a line, not a design element of its own.
  const ruleOpacity = useTransform(progress, (value) => 0.55 * tierProgress(value, tier));

  return (
    <g>
      <motion.rect
        x={width * 0.06}
        y={y}
        width={width * 0.88}
        height={1}
        fill="rgba(20,20,15,0.14)"
        style={{ opacity: ruleOpacity }}
      />
      <motion.g style={{ opacity }}>
        {nodes.map((node, index) => (
          <Node
            key={`${tier}-${index}`}
            node={node}
            progress={progress}
            scatter={scatter}
            width={width}
            height={height}
            accent={last}
          />
        ))}
      </motion.g>
    </g>
  );
}

interface NodeProps {
  progress: MotionValue<number>;
  node: SystemNode;
  scatter: number;
  width: number;
  height: number;
  accent: boolean;
}

function Node({ progress, node, scatter, width, height, accent }: NodeProps) {
  const transform = useTransform(progress, (value) => {
    const point = nodePoint(node, value, scatter, width, height);
    const rotate = node.cr * scatter * (1 - point.t);
    const scale = 1 + (node.cs - 1) * scatter * (1 - point.t);
    return `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) rotate(${rotate.toFixed(2)}) scale(${scale.toFixed(3)})`;
  });

  return (
    <motion.g transform={transform}>
      <NodeShape node={node} accent={accent} />
    </motion.g>
  );
}

/**
 * Drawn centred on the origin so the group's `translate` is the node's centre
 * and `rotate`/`scale` pivot on it without a `transform-origin` to maintain.
 *
 * The vocabulary is the site's own: white surfaces, hairline rules, square
 * corners at a 1-2px radius. A "node" here is a small paper object, not a
 * glowing point — which is what keeps the field reading as a systems diagram
 * rather than a night sky.
 */
function NodeShape({ node, accent }: { node: SystemNode; accent: boolean }) {
  if (node.shape === "dot") {
    return <circle r={node.size} fill="rgba(20,20,15,0.34)" />;
  }

  if (node.shape === "block") {
    const w = node.size * 2;
    const h = Math.round(node.size * 1.25);
    return (
      <g>
        <rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx={2}
          fill="#FFFFFF"
          stroke={accent ? "#C9871F" : "rgba(20,20,15,0.26)"}
          strokeWidth={1}
        />
        {/* A header rule — enough to read as a surface rather than a box. */}
        <rect x={-w / 2 + 3} y={-h / 2 + 4} width={w - 6} height={1} fill="rgba(20,20,15,0.2)" />
      </g>
    );
  }

  const s = node.size;
  return (
    <rect
      x={-s}
      y={-s}
      width={s * 2}
      height={s * 2}
      rx={1}
      fill="#FFFFFF"
      stroke="rgba(20,20,15,0.26)"
      strokeWidth={1}
    />
  );
}
