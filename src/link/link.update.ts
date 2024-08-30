import type { SceneContext } from 'telegraf/typings/scenes';

import { Action, Ctx, Update } from 'nestjs-telegraf';

import { LinkAction } from './link.buttons';
import { ADD_LINK_SCENE_ID } from './scenes/add-link.scene';
import { REMOVE_LINK_SCENE_ID } from './scenes/remove-link.scene';
import { VIEW_LINKS_SCENE_ID } from './scenes/view-links.scene';

@Update()
export class LinkUpdate {
  @Action(LinkAction.ADD_LINK)
  async addLink(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter(ADD_LINK_SCENE_ID);
    await ctx.answerCbQuery();
  }

  @Action(LinkAction.VIEW_LINKS)
  async viewLinks(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter(VIEW_LINKS_SCENE_ID);
    await ctx.answerCbQuery();
  }

  @Action(LinkAction.REMOVE_LINK)
  async removeLinks(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter(REMOVE_LINK_SCENE_ID);
    await ctx.answerCbQuery();
  }
}
