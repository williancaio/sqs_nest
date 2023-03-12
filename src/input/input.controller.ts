import { Controller, Post, Body } from '@nestjs/common';
import { InputService } from './input.service';
export interface Input {
  input_id: number;
  name: string;
  address: string;
}

@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Post()
  async create(@Body() input: Input): Promise<Input> {
    await this.inputService.sendToQueue(input);
    return input;
  }
}