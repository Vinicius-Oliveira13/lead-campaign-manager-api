import { Group } from "@prisma/client";
import { CreateGroupAttributes, GroupsRepository } from "../GroupsRepository";
import { prisma } from "../../database";

export class PrismaGroupsRepository {
    find(): Promise<Group[]> {
        return prisma.group.findMany();
    }
    findById(id: number): Promise<Group | null> {
        return prisma.group.findUnique({ where: { id }, include:{ leads: true } });
    }
    create(attributes: CreateGroupAttributes): Promise<Group> {
        return prisma.group.create({ data: attributes });
    }
    update(id: number, attributes: Partial<CreateGroupAttributes>): Promise<Group | null> {
        return prisma.group.update({ where: { id }, data: attributes });
    }
    delete(id: number): Promise<Group | null> {
        return prisma.group.delete({ where: { id } });        
    }

    addLead(groupId: number, leadId: number): Promise<Group> {
        return prisma.group.update({
            where: { id: groupId },
            data: {
                leads: {
                    connect: { id: leadId }
                }
            },
            include: { leads: true }
        });
    }

    removeLead(groupId: number, leadId: number): Promise<Group> {
        return prisma.group.update({
            where: { id: groupId },
            data: {
                leads: {
                    disconnect: { id: leadId }
                }
            },
            include: { leads: true }
        });
    }
}