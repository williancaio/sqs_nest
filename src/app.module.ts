import { Module } from '@nestjs/common';
import { InputController } from './input/input.controller';
import { InputService } from './input/input.service';
import { SQS } from 'aws-sdk';
import { SqsModule } from './sqs-module/sqs-module.module';
import { ConsumeService } from './consume/consume.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [InputController],
  providers: [InputService, SqsModule, ConsumeService],
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
