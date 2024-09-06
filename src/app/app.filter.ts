import { Catch } from '@nestjs/common';
import {
  TelegrafArgumentsHost,
  TelegrafExceptionFilter,
} from 'nestjs-telegraf';
import { type Context, Markup } from 'telegraf';

import { AppException } from './app.exception';
import { leaveSceneBtn } from './scene.buttons';

const leaveBtn = Markup.inlineKeyboard([
  leaveSceneBtn('Вернуться в главное меню'),
]);

@Catch()
export class AppFilter implements TelegrafExceptionFilter {
  async catch(exception: unknown, host: TelegrafArgumentsHost) {
    const telegrafHost = TelegrafArgumentsHost.create(host);
    const ctx = telegrafHost.getContext<Context>();
    if (exception instanceof AppException) {
      await ctx.reply(exception.message, leaveBtn);
      return;
    }

    await ctx.reply('Неизвестная ошибка', leaveBtn);
  }
}
