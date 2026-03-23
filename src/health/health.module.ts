import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [HealthController],
})
export class HealthModule {
  constructor(private readonly configService: ConfigService) {}
}
