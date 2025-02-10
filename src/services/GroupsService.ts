import { HttpError } from "../errors/HttpError";
import { CreateGroupAttributes, GroupsRepository } from "../repositories/GroupsRepository";
import { LeadStatus, LeadWhereParams, LeadsRepository } from "../repositories/LeadsRepository";

interface GetGroupsWithPaginationParams {
    page?: number;
    pageSize?: number;
    name?: string;
    status?: LeadStatus;
    sortBy?: "name" | "createdAt";
    order?: "asc" | "desc";
}


export class GroupsService {

    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }

    async getAllGroups() {
        const groups = await this.groupsRepository.find()
        return groups
    }

    async getGroupsPaginated(groupId: number, params: GetGroupsWithPaginationParams) {
        const { page = 1, pageSize = 10, sortBy, order, name, status } = params

        const limit = pageSize
        const offset = (page - 1) * limit

        const where: LeadWhereParams = { groupId }

        if (name) where.name = { like: name, mode: "insensitive" }
        if (status) where.status = status

        const total = await this.leadsRepository.count(where)

        const leads = await this.leadsRepository.find({
            where,
            sortBy,
            order,
            limit,
            offset,
            include: { groups: true }
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

    async getGroupById(groupId: number) {
        const group = await this.groupsRepository.findById(groupId)

        if (!group) throw new HttpError(404, "grupo não encontrado")

        return group
    }

    async create(params: CreateGroupAttributes) {
        const newGroup = await this.groupsRepository.create(params)
        return newGroup
    }

    async updateGroup(groupId: number, params: Partial<CreateGroupAttributes>) {
        const updatedGroup = await this.groupsRepository.update(groupId, params)

        if (!updatedGroup) throw new HttpError(404, "grupo não encontrado")

        return updatedGroup
    }

    async deleteGroup(groupId: number) {
        const deletedGroup = await this.groupsRepository.delete(groupId)
        if (!deletedGroup) throw new HttpError(404, "grupo não encontrado")

        return deletedGroup
    }

    async addLeadToGroup(groupId: number, leadId: number) {
        const updatedGroup = await this.groupsRepository.addLead(groupId, leadId)
        
        return updatedGroup
    }

    async removeLeadFromGroup(groupId: number, leadId: number) {
        const updatedGroup = await this.groupsRepository.removeLead(groupId, leadId)
        
        return updatedGroup
    }


}