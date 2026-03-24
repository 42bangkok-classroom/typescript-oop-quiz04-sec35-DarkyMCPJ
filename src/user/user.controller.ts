import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('test')
  test(): string[] {
    return this.UserService.test();
  }
  
  @Get()
  findAll(): any {
    return this.UserService.findAll();
  }
}
