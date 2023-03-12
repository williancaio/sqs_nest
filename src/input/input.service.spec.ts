// input.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { InputService } from './input.service';
import { SqsModule } from '../sqs-module/sqs-module.module';

describe('InputService', () => {
  let inputService: InputService;
  let sqsModule: SqsModule;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        InputService,
        {
          provide: SqsModule,
          useValue: {
            sqs: {
              sendMessage: jest.fn().mockReturnThis(),
              promise: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    inputService = moduleRef.get<InputService>(InputService);
    sqsModule = moduleRef.get<SqsModule>(SqsModule);
  });

  describe('sendToQueue', () => {
    it('should send input data to the queue', async () => {
      const inputData = {
        input_id: 1,
        name: 'John',
        address: '123 Main St',
      };

      const expectedParams = {
        QueueUrl: process.env.QueueUrl,
        MessageBody: JSON.stringify(inputData),
      };

      await inputService.sendToQueue(inputData);

      expect(sqsModule.sqs.sendMessage).toHaveBeenCalledWith(expectedParams);
    });
  });
});
