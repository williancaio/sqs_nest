import { Test, TestingModule } from '@nestjs/testing';
import { InputController } from './input.controller';
import { InputService } from './input.service';

describe('InputController', () => {
  let controller: InputController;
  let service: InputService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InputController],
      providers: [InputService],
    }).compile();

    controller = module.get<InputController>(InputController);
    service = module.get<InputService>(InputService);
  });

  describe('create', () => {
    it('should create input and return it', async () => {
      // Create a mock input
      const mockInput = { input_id: 1, name: 'John', address: '123 Main St' };

      // Create a spy for the service method 'create'
      jest.spyOn(service, 'sendToQueue').mockResolvedValue();

      // Call the create method of InputController with the mock input
      const result = await controller.create(mockInput);

      // Check that the service method 'create' was called with the correct parameter
      expect(service.sendToQueue).toHaveBeenCalledWith(mockInput);

      // Check that the controller returned the correct result
      expect(result).toBe(mockInput);
    });
  });
});