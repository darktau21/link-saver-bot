import type { SceneContext } from 'telegraf/typings/scenes';

import { Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';

import { linkActionsKeyboard } from '~/link/link.buttons';
import { LinkService } from '~/link/link.service';
import { LinkCodePipe } from '~/link/pipes/link-code.pipe';

export const APP_SCENE_ID = 'scene:app-scene';

@Scene(APP_SCENE_ID)
export class AppScene {
  constructor(private readonly linkService: LinkService) {}

  @SceneEnter()
  async start(@Ctx() ctx: SceneContext) {
    ctx.reply(
      'Выбери, что хочешь сделать или отправь код ссылки в чат',
      linkActionsKeyboard()
    );
  }

  @On('text')
  async getLink(
    @Message('text', LinkCodePipe) code: string,
    @Ctx() ctx: SceneContext
  ) {
    const link = await this.linkService.getLinkByCode(code);

    if (!link) {
      await ctx.reply('Ссылка не найдена');
      await ctx.scene.reenter();
      return;
    }

    await ctx.reply(link.url);
    await ctx.scene.reenter();
  }
}
