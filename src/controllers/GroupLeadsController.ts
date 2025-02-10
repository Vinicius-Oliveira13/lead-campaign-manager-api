import { Handler } from "express";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { AddLeadRequestSchema } from "./schemas/GroupsRequestSchema";
import { GroupsService } from "../services/GroupsService";

export class GroupLeadsController {
    constructor(
        private readonly groupsService: GroupsService
    ) { }

    getLeads: Handler = async (req, res, next) => {
        try {
            const groupId = parseInt(req.params.groupId)
            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", sortBy = "name", order = "asc", name, status } = query

            const result = await this.groupsService.getGroupsPaginated(groupId, {
                name,
                status,
                order,
                page: Number(page),
                pageSize: Number(pageSize),
                sortBy
            })

            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId)

            const { leadId } = AddLeadRequestSchema.parse(req.body)
            
            const updatedGroup = await this.groupsService.addLeadToGroup(groupId, leadId)

            res.status(201).json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId)
            const leadId = Number(req.params.leadId)

            const updatedGroup = await this.groupsService.removeLeadFromGroup(groupId, leadId)

            res.json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }
}