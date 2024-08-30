import { Injectable } from '@nestjs/common';

import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class LinkService {
  constructor(private readonly db: PrismaService) {}

  saveLinks(links: string[], ownerId: number) {
    return this.db.link.createManyAndReturn({
      data: links.map((url) => ({
        ownerId,
        url,
      })),
    });
  }

  async getTotalPages(ownerId: number, take: number = 10): Promise<number> {
    const totalCount = await this.db.link.count({
      where: {
        ownerId,
      },
    });

    return Math.ceil(totalCount / take);
  }

  async getLinksByOwner(ownerId: number, page: number = 1, take: number = 10) {
    const skip = (page - 1) * take;

    return this.db.link.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
      where: {
        ownerId,
      },
    });
  }

  async getLinkByCode(code: string, ownerId?: number) {
    return this.db.link.findUnique({
      where: { code, ownerId },
    });
  }

  async removeLinkByCode(ownerId: number, code: string) {
    return this.db.link.delete({
      select: {
        id: true,
      },
      where: {
        code,
        ownerId,
      },
    });
  }

  async removeAll(ownerId: number) {
    return this.db.link.deleteMany({
      where: {
        ownerId,
      },
    });
  }
}
