import { Injectable } from '@nestjs/common';
Import { IUser } from './user.interface';

import { readFileSync } from 'fs';
Import { join } from 'path';

const usersFilePath = join(__dirname, 'users.json');

@Injectable()
export class UserService {
  test(): string[] {
    return [];
  }

findAll  (): IUser[] {
    const readUserData = readFileSync(usersFilePath, 'utf-8');
    const userData = JSON.parse(readUserData) as IUser[];
    return userData;
  }
}
