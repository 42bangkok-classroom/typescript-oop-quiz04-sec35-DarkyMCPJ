import { Controller, Get, Query, Param, Post, UsePipes, ValidationPipe, Body,} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('test')
  test() {
    return this.userService.test();
  }
  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): IUser | Partial<IUser> {
    const fieldArray = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, fieldArray);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
