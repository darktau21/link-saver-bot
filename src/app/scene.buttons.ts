import { Markup } from 'telegraf';

export enum SceneAction {
  LEAVE_SCENE = 'LEAVE_SCENE',
}

export function leaveSceneBtn(text = 'Выйти') {
  return Markup.button.callback(text, SceneAction.LEAVE_SCENE);
}
