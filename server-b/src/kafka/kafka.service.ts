import { Injectable } from '@nestjs/common';
import { Consumer, KafkaClient } from 'kafka-node';
import { Subject } from 'rxjs';

import { KafkaConsumer } from './kafka.interface';

@Injectable()
export class KafkaService {
  client: KafkaClient;

  consumers: KafkaConsumer[] = [];
  public consumerTopicEvents = new Subject<any>();
  public consumerErrors = new Subject<any>();

  constructor() {
    this.client = new KafkaClient({ kafkaHost: 'localhost:9091' });
  }

  consume(newTopic: string): void {
    const newConsumer = new Consumer(
      this.client,
      [{ topic: newTopic, partition: 0 }],
      { autoCommit: false },
    );

    newConsumer.on('message', message => {
      this.consumerTopicEvents.next(message);
    });

    this.consumers.push({ topic: newTopic, consumer: newConsumer });
  }
}
