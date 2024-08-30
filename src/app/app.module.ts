import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Redis } from '@telegraf/session/redis';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';

import { LinkModule } from '~/link/link.module';
import { PrismaModule } from '~/prisma/prisma.module';

import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { AppFilter } from './app.filter';
import { AppScene } from './app.scene';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    PrismaModule,
    LinkModule,
    AppConfigModule,
    TelegrafModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        const store = Redis({
          url: configService.get('REDIS_URL'),
        });
        return {
          middlewares: [session({ store })],
          token: configService.get('BOT_TOKEN'),
        };
      },
    }),
  ],
  providers: [
    AppUpdate,
    AppScene,
    { provide: APP_FILTER, useClass: AppFilter },
  ],
})
export class AppModule {}
