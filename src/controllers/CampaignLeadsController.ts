import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignsRequestSchema";
import { CampaignsService } from "../services/CampaignsService";

export class CampaignLeadsController {

    constructor(
        private readonly campaignService: CampaignsService
    ) { }

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = parseInt(req.params.campaignId)
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", sortBy = "name", order = "asc", name, status } = query

            const result = await this.campaignService.getLeadsWithPagination(campaignId, {
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
            const campaignId = parseInt(req.params.campaignId)
            const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body)

            await this.campaignService.addLeadToCampaign( campaignId, leadId, status )

            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    updateLeadStatus: Handler = async (req, res, next) => {
        try {
            const campaignId = parseInt(req.params.campaignId)
            const leadId = parseInt(req.params.leadId)
            const { status } = UpdateLeadStatusRequestSchema.parse(req.body)

            await this.campaignService.updateLeadStatus( campaignId, leadId, status )

            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const campaignId = parseInt(req.params.campaignId)
            const leadId = parseInt(req.params.leadId)

            await this.campaignService.removeLead(campaignId, leadId)

            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}