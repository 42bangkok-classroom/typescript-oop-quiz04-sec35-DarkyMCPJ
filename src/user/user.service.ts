import { Injectable, 
  NotFoundException, 
  InternalServerErrorException, 
} from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly dataPath = path.join(process.cwd(), 'data', 'users.json');

  test(): string[] {
    return [];
  }

  findAll(): IUser[] {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    const users = JSON.parse(rawData) as IUser[];
    return users;
  }

  findOne(id: string, fields?: string[]) {
    try {
      const users = this.findAll();
      const user = users.find((u) => String(u.id) === id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (fields) {
        const filteredUser: Partial<IUser> = {};

        fields.forEach((field) => {
          const key = field as keyof IUser;

          if (user[key] !== undefined) {
            filteredUser[key] = user[key] as never;
          }
        });

        return filteredUser;
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Cannot process user data');
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
      const filePath = path.join(process.cwd(), 'data', 'users.json');

      const users = this.findAll();

      let maxId = 0;
      if (users.length > 0) {
        const ids = users.map((u) => parseInt(String(u.id), 10));
        maxId = Math.max(...ids);
      }
      const newId = String(maxId + 1);

      const newUser = {
        id: newId,
        ...createUserDto,
      };

      users.push(newUser as unknown as IUser);

      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

      return newUser;
    } catch {
      throw new InternalServerErrorException('Cannot create user');
    }
  }
}
