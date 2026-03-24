import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, '../../data/users.json');

@Injectable()
export class UserService {
  test() {
    return [];
  }

  findAll(): IUser[] {
    const readUserData = readFileSync(filePath, 'utf-8');
    const userData = JSON.parse(readUserData) as IUser[];
    return userData;
  }


  findOne(id: string, fields?: string[]): Partial<InterUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (fields) {
      const filteredUser: Partial<InterUser> = {};

      fields.forEach((field) => {
        if (user[field as keyof InterUser] !== undefined) {
          filteredUser[field as keyof InterUser] =
            user[field as keyof InterUser];
        }
      });
      return filteredUser;
    }
    return user;
  }
}
