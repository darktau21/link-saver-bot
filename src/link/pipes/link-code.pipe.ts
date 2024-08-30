import { Injectable, type PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

import { AppException } from '~/app/app.exception';

@Injectable()
export class LinkCodePipe implements PipeTransform {
  transform(value: string) {
    const trimmedValue = value.trim();
    if (!isUUID(trimmedValue)) {
      throw new AppException('Невалидный код ссылки');
    }

    return trimmedValue;
  }
}
