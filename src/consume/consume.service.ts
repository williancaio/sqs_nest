import { Injectable } from '@nestjs/common';
import { SqsModule } from '../sqs-module/sqs-module.module';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ConsumeService {
  private queueUrl: string;

  constructor(private readonly sqsModule: SqsModule) {
    this.queueUrl = process.env.QueueUrl; // substituir pela URL da fila desejada
  }

  @Cron('*/5 * * * * *') // agendando a execução a cada 5 segundos
  async readMessages() {
    console.log('executou')
    const receiveMessageParams = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10, // ler até 10 mensagens por vez
      VisibilityTimeout: 30, // invisibilidade de 30 segundos para processar as mensagens
    };

    try {
      const data = await this.sqsModule.sqs.receiveMessage(receiveMessageParams).promise();
      console.log("==========================")
      console.log(data)
      const messages = data.Messages || [];

      for (const message of messages) {
        console.log('Received message:', message.Body);

        // adicionar aqui a lógica de processamento da mensagem

        const deleteMessageParams = {
          QueueUrl: this.queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        };

        await this.sqsModule.sqs.deleteMessage(deleteMessageParams).promise();
        console.log('Deleted message:', message.MessageId);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
