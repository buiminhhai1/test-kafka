import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { Logger, Module } from '@nestjs/common';
@Module({
  controllers: [KafkaController],
  providers: [KafkaService, Logger],
})
export class KafkaModule {}
