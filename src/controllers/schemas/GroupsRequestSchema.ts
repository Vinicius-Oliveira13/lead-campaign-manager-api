import { z } from "zod";

export const GetGroupsRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
})

export const CreateGroupRequestSchema = z.object({
    name: z.string(),
    description: z.string()
})

export const UpdateGroupRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
})

export const AddLeadRequestSchema = z.object({
    leadId: z.number()
})