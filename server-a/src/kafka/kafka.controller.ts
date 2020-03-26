import { Body, Controller, Logger, Post } from '@nestjs/common';

import { KafkaPayload } from './kafka.interface';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private kafkaService: KafkaService, private logger: Logger) {
    this.kafkaService.producerEvents.subscribe(event => {
      this.logger.log('Producer Event', JSON.stringify(event));
    });

    this.kafkaService.producerEvents.subscribe(error => {
      this.logger.error('Producer Error', JSON.stringify(error));
    });
  }

  @Post('produce')
  produce(@Body() payload: KafkaPayload): Promise<boolean> {
    return this.kafkaService.produce(payload);
  }
}
