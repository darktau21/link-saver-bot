import { Injectable, type PipeTransform } from '@nestjs/common';
import { isURL } from 'class-validator';

import { AppException } from '~/app/app.exception';

import { MAX_LINKS_PER_ADD_REQUEST } from '../const';

@Injectable()
export class AddLinksPipe implements PipeTransform {
  transform(value: string) {
    const links = Array.from(
      new Set(
        value
          .split('\n')
          .filter((l) => l.length > 0)
          .map((l) => l.trim())
      )
    );

    if (links.length > MAX_LINKS_PER_ADD_REQUEST) {
      throw new AppException(
        `Максимальное количество ссылок в одном сообщении - ${MAX_LINKS_PER_ADD_REQUEST}`
      );
    }

    links.forEach((l) => {
      if (!isURL(l)) {
        throw new AppException(`Ссылка ${l} невалидна`);
      }
    });

    return links;
  }
}
