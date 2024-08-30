import type { SceneContext } from 'telegraf/typings/scenes';

import {
  Ctx,
  Message,
  On,
  Scene,
  SceneEnter,
  SceneLeave,
} from 'nestjs-telegraf';
import { Markup } from 'telegraf';

import { formatLinks } from '~/lib/formatLinks';

import { leaveSceneBtn } from '../../app/scene.buttons';
import { MAX_LINKS_PER_ADD_REQUEST } from '../const';
import { LinkService } from '../link.service';
import { AddLinksPipe } from '../pipes/add-links.pipe';

export const ADD_LINK_SCENE_ID = 'scene:add-link';

const leaveBtn = Markup.inlineKeyboard([
  leaveSceneBtn('Выйти из режима добавления'),
]);

@Scene(ADD_LINK_SCENE_ID)
export class AddLinkScene {
  constructor(private readonly linkService: LinkService) {}
  @SceneEnter()
  async enter(ctx: SceneContext) {
    await ctx.replyWithHTML(
      `Для добавления ссылок, напиши их, каждую с новой строки\n(до ${MAX_LINKS_PER_ADD_REQUEST} ссылок в сообщении)\n\nНапример:\n<code>https://www.google.com/\nhttps://www.youtube.com/</code>`,
      leaveBtn
    );
  }

  @On('text')
  async processMessage(
    @Message('text', AddLinksPipe) links: string[],
    @Ctx() ctx: SceneContext
  ) {
    const userId = ctx.from.id;

    const linksData = await this.linkService.saveLinks(links, userId);

    await ctx.replyWithHTML(
      `Добавленные ссылки:\n${formatLinks(linksData)}`,
      leaveBtn
    );
  }

  @SceneLeave()
  async onLeave(@Ctx() ctx: SceneContext) {
    await ctx.reply(
      'Вы вышли из режима добавления ссылок.\nЧтобы поделиться ссылкой, скопируйте её код и отправьте получателю'
    );
  }
}
