import { plainToInstance } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsPort,
  IsString,
  IsStrongPassword,
  validateSync,
} from 'class-validator';

export class ConfigSchema {
  @IsString()
  BOT_TOKEN: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  @IsStrongPassword({
    minSymbols: 0,
  })
  DB_PASSWORD: string;

  @IsPort()
  DB_PORT: string;

  @IsString()
  DB_USER: string;

  @IsIn(['production', 'development'])
  NODE_ENV: 'development' | 'production';

  @IsInt()
  REDIS_DB: number;

  @IsString()
  REDIS_HOST: string;

  @IsString()
  @IsStrongPassword({
    minSymbols: 0,
  })
  REDIS_PASSWORD: string;

  @IsPort()
  REDIS_PORT: string;

  @IsString()
  REDIS_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ConfigSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
