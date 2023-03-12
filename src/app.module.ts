import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InputController } from './input/input.controller';
import { InputService } from './input/input.service';
import { SQS } from 'aws-sdk';
import { SqsModule } from './sqs-module/sqs-module.module';

@Module({
  imports: [],
  controllers: [AppController, InputController],
  providers: [AppService, InputService, SqsModule],
})
export class AppModule {}

@Module({
  controllers: [InputController],
  providers: [
    InputService,
    {
      provide: 'SQS',
      useValue: new SQS({ region: process.env.AWS_REGION }),
    },
  ],
})
export class InputModule {}
