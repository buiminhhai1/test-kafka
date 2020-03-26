import { Consumer } from 'kafka-node';

export interface KafkaConsumer {
  topic: string;
  consumer: Consumer;
}
