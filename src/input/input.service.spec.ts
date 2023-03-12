import { Test } from '@nestjs/testing';
import { InputService, SQS } from './input.service';



describe('InputService', () => {
  let service: InputService;
  let sqs: SQS;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InputService,
        {
          provide: SQS,
          useFactory: () => ({
            sendMessage: jest.fn().mockReturnValue({
              promise: jest.fn(),
            }),
          }),
        },
      ],
    }).compile();

    service = moduleRef.get<InputService>(InputService);
    
  });

  describe('sendToQueue', () => {
    it('should send data to queue', async () => {
      const inputData = {
        input_id: 1,
        name: 'John Doe',
        address: '123 Main Street',
      };

      await service.sendToQueue(inputData);
      const mockSqs = SQS;
      const sendMessageParams = mockSqs.mock.calls[0][0];
      expect(sendMessageParams.QueueUrl).toEqual('https://sqs.us-east-1.amazonaws.com/123456789012/my-queue');
      expect(sendMessageParams.MessageBody).toEqual(JSON.stringify(inputData));
    });
  });
});
