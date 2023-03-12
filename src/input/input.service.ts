import { Injectable } from '@nestjs/common';
import { SqsModule } from '../sqs-module/sqs-module.module';

interface InputData {
  input_id: number;
  name: string;
  address: string;
}

interface SendMessageRequest {
  QueueUrl: string;
  MessageBody: string;
}

@Injectable()
export class InputService {
  constructor(private readonly sqsModule: SqsModule) {}

  async sendToQueue(data: InputData): Promise<void> {
    console.log(process.env.QUEUE_URL)
    const params: SendMessageRequest = {
      QueueUrl: process.env.QueueUrl,
      MessageBody: JSON.stringify(data),
    };

    await this.sqsModule.sqs.sendMessage(params).promise();
  }
}