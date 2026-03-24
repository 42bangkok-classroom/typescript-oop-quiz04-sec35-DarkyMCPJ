import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { writeFileSync } from 'fs';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  test() {
    return [];
  }
  findAll(): IUser[] {
    const fileData = fs.readFileSync(
      path.join(process.cwd(), 'data', 'users.json'),
      'utf-8',
    );
    return JSON.parse(fileData) as IUser[];
  }
  findOne(id: string, fields?: string[]): IUser | Partial<IUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!fields) {
      return user;
    }
    if (fields.length === 0) {
      return {};
    }
    const fielduser: Partial<IUser> = {};
    fields.forEach((field) => {
      if (field in user) {
        fielduser[field as keyof IUser] = user[field as keyof IUser];
      }
    });
    return fielduser;
  }
  create(dto: CreateUserDto): IUser {
    const users = this.findAll();
    const newId = (
      users.reduce((maxId, user) => Math.max(maxId, Number(user.id)), 0) + 1
    ).toString();

    const newUser: IUser = {
      id: newId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      username: dto.username,
      email: dto.email,
    };

    users.push(newUser);
    writeFileSync('./data/users.json', JSON.stringify(users, null, 2), 'utf-8');
    return newUser;
  }
}
