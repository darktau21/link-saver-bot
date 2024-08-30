import type { SceneContext } from 'telegraf/scenes';

import { Action, Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup } from 'telegraf';

import { leaveSceneBtn } from '~/app/scene.buttons';

import { clearAllBtn, LinkAction } from '../link.buttons';
import { LinkService } from '../link.service';
import { LinkCodePipe } from '../pipes/link-code.pipe';

export const REMOVE_LINK_SCENE_ID = 'scene:remove-link';

const removeLinkKeyboard = Markup.inlineKeyboard([
  [clearAllBtn()],
  [leaveSceneBtn('Выйти из режима удаления')],
]);

@Scene(REMOVE_LINK_SCENE_ID)
export class RemoveLinkScene {
  constructor(private readonly linkService: LinkService) {}
  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext) {
    await ctx.reply(
      'Отправьте в чат код ссылки, которую хотите удалить',
      removeLinkKeyboard
    );
  }

  @Action(LinkAction.CLEAR_ALL)
  async clearAll(@Ctx() ctx: SceneContext) {
    const userId = ctx.from.id;

    await this.linkService.removeAll(userId);

    await ctx.reply('Все добавленные вами ссылки удалены', removeLinkKeyboard);
    await ctx.scene.reenter();
  }

  @On('text')
  async removeLink(
    @Message('text', LinkCodePipe) code: string,
    @Ctx() ctx: SceneContext
  ) {
    const userId = ctx.from.id;

    const link = await this.linkService.getLinkByCode(code, userId);

    if (!link) {
      await ctx.reply('Ссылка не найдена');
      await ctx.scene.reenter();
      return;
    }

    await this.linkService.removeLinkByCode(userId, code);

    await ctx.reply(`Ссылка ${link.url} удалена`);
    await ctx.scene.reenter();
  }
}
