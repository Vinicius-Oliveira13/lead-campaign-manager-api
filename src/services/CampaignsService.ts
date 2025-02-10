import { HttpError } from "../errors/HttpError"
import { CampaignsRepository, CreateCampaignAttributes, LeadCampaignStatus } from "../repositories/CampaignsRepository"
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository"


interface GetCampaignLeadsWithPaginationParams {
    page?: number;
    pageSize?: number;
    name?: string;
    status?: LeadCampaignStatus;
    sortBy?: "name" | "createdAt";
    order?: "asc" | "desc";
}


export class CampaignsService {

    constructor(
        private readonly campaignsRepository: CampaignsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }

    async getLeadsWithPagination(campaignId: number, params: GetCampaignLeadsWithPaginationParams) {
        const { page = 1, pageSize = 10, sortBy, order, name, status } = params

        const limit = pageSize
        const offset = (page - 1) * limit

        const where: LeadWhereParams = { campaignId, campaignStatus: status }

        if (name) where.name = { like: name, mode: "insensitive" }

        const total = await this.leadsRepository.count(where)

        const leads = await this.leadsRepository.find({
            where,
            sortBy,
            order,
            limit,
            offset,
            include: { campaigns: true }
        })

        return {
            leads,
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    }

    async getAllCampaigns() {
        const campaigns = await this.campaignsRepository.find()

        return campaigns
    }

    async createCampaign(params: CreateCampaignAttributes) {
        const newCampaign = await this.campaignsRepository.create(params)

        return newCampaign
    }

    async getCampaignById(campaignId: number) {
        const campaign = await this.campaignsRepository.findById(campaignId)

        if (!campaign) throw new HttpError(404, "campanha não encontrada")

        return campaign
    }

    async updateCampaign(campaignId: number, params: Partial<CreateCampaignAttributes>) {
        const updatedCampaign = await this.campaignsRepository.updateById(campaignId, params)
        
        if (!updatedCampaign) throw new HttpError(404, "campanha não encontrada")

        return updatedCampaign
    }

    async deleteCampaign(campaignId: number) {
        const deletedCampaign = await this.campaignsRepository.deleteById(campaignId)
        
        if (!deletedCampaign) throw new HttpError(404, "campanha não encontrada")

        return deletedCampaign
    }

    async addLeadToCampaign(campaignId: number, leadId: number, status: LeadCampaignStatus) {
        const newLead = await this.campaignsRepository.addLead({ campaignId, leadId, status })

        return newLead
    }

    async updateLeadStatus( campaignId: number, leadId: number, status: LeadCampaignStatus ) {
        await this.campaignsRepository.updateLeadStatus({ campaignId, leadId, status })
    }

    async removeLead(campaignId: number, leadId: number) {
        await this.campaignsRepository.removeLead(campaignId, leadId)
    }
    
}