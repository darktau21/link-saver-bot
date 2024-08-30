import type { SceneContext } from 'telegraf/typings/scenes';

import { Action, Ctx, Start, Update } from 'nestjs-telegraf';

import { APP_SCENE_ID } from './app.scene';
import { SceneAction } from './scene.buttons';

@Update()
export class AppUpdate {
  @Start()
  async start(ctx: SceneContext) {
    const userName = ctx.from.first_name;
    await ctx.replyWithHTML(
      `Привет, <b>${userName}</b>!\nЭтот бот позволяет сохранять ссылки.`
    );
    await ctx.scene.enter(APP_SCENE_ID);
  }

  @Action(SceneAction.LEAVE_SCENE)
  async leave(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.answerCbQuery();
    await ctx.scene.enter(APP_SCENE_ID);
  }
}
