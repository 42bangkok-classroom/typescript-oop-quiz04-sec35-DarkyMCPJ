import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { InterUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test() {
    return this.userService.test();
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getoneUser(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): Partial<InterUser> {
   const arrayfield = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, arrayfield);
  }
}
