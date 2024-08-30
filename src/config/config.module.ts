import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './config.schema';
import { AppConfigService } from './config.service';

@Global()
@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      validate,
    }),
  ],
  providers: [AppConfigService],
})
export class AppConfigModule {}
