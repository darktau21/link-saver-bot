import { Module } from '@nestjs/common';

import { LinkService } from './link.service';
import { LinkUpdate } from './link.update';
import { LinkScenes } from './scenes';

@Module({
  exports: [LinkService],
  providers: [LinkService, LinkUpdate, ...LinkScenes],
})
export class LinkModule {}
