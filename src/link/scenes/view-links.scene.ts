import type { SceneContext, SceneSessionData } from 'telegraf/typings/scenes';

import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';

import { AppException } from '~/app/app.exception';

import { formatLinks } from '../../lib/formatLinks';
import {
  maxLimitPaginationKeyboard,
  minLimitPaginationKeyboard,
  PaginationAction,
  paginationKeyboard,
  singlePagePaginationKeyboard,
} from '../link.buttons';
import { LinkService } from '../link.service';

export const VIEW_LINKS_SCENE_ID = 'scene:view-links';

function formatPaginationPage(
  links: string,
  currentPage: number,
  totalPages: number
) {
  return `Страница ${currentPage} из ${totalPages}\n\n${links}`;
}

@Scene(VIEW_LINKS_SCENE_ID)
export class ViewLinksScene {
  constructor(private readonly linkService: LinkService) {}

  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext<CustomSceneSession>) {
    const userId = ctx.from.id;
    const links = await this.linkService.getLinksByOwner(userId);
    const totalPages = await this.linkService.getTotalPages(userId);
    ctx.scene.session.state = {
      page: 1,
      totalPages,
    };

    if (links?.length === 0) {
      throw new AppException('Вы пока не добавляли никаких ссылок');
    }

    await ctx.replyWithHTML(
      formatPaginationPage(formatLinks(links), 1, totalPages),
      totalPages === 1
        ? singlePagePaginationKeyboard()
        : minLimitPaginationKeyboard()
    );
  }

  @Action(PaginationAction.NEXT_PAGE)
  async nextPage(@Ctx() ctx: SceneContext<CustomSceneSession>) {
    const page = ++ctx.scene.session.state.page;
    const totalPages = ctx.scene.session.state.totalPages;

    const userId = ctx.from.id;

    const links = await this.linkService.getLinksByOwner(userId, page);

    await ctx.editMessageText(
      formatPaginationPage(formatLinks(links), page, totalPages),
      page >= totalPages ? maxLimitPaginationKeyboard() : paginationKeyboard()
    );
  }

  @Action(PaginationAction.PREV_PAGE)
  async prevPage(@Ctx() ctx: SceneContext<CustomSceneSession>) {
    const page = --ctx.scene.session.state.page;
    const totalPages = ctx.scene.session.state.totalPages;

    const userId = ctx.from.id;

    const links = await this.linkService.getLinksByOwner(userId, page);

    await ctx.editMessageText(
      formatPaginationPage(formatLinks(links), page, totalPages),
      page <= 1 ? minLimitPaginationKeyboard() : paginationKeyboard()
    );
  }
}

interface CustomSceneSession extends SceneSessionData {
  state: {
    page: number;
    totalPages: number;
  };
}
