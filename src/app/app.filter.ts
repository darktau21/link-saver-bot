import { type ArgumentsHost, Catch } from '@nestjs/common';
import { TelegrafExceptionFilter } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';

import { AppException } from './app.exception';
import { leaveSceneBtn } from './scene.buttons';

const leaveBtn = Markup.inlineKeyboard([
  leaveSceneBtn('Вернуться в главное меню'),
]);

@Catch()
export class AppFilter implements TelegrafExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.getArgs().find((a) => a instanceof Context);

    if (exception instanceof AppException) {
      ctx.reply(exception.message, leaveBtn);
      return;
    }

    ctx.reply('Неизвестная ошибка', leaveBtn);
  }
}
