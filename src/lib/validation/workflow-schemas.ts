import {z} from "zod";

export const CreateWorkflowSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export const NodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),      
  }),
  data: z.object({
    label: z.string(),
    config: z.record(z.string(), z.unknown()).optional(),
  }),
})

export const EdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
  sourceHandle : z.string().nullable().optional(),
  targetHandle : z.string().nullable().optional(),
});

export const UpdateWorkflowSchema = CreateWorkflowSchema.extend({
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
});