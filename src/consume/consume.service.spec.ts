import { Test, TestingModule } from '@nestjs/testing';
import { ConsumeService } from './consume.service';
import { SqsModule } from '../sqs-module/sqs-module.module';

describe('ConsumeService', () => {
  let service: ConsumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumeService, SqsModule],
    }).compile();

    service = module.get<ConsumeService>(ConsumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('SqsModule', () => {
  let module: SqsModule;

  beforeEach(async () => {
    module = new SqsModule();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
