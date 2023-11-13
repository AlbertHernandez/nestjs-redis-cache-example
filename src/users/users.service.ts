import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sleep } from '../sleep';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const usersCacheKey = 'users';
    const cachedUsers = await this.cacheManager.get(usersCacheKey);

    if (cachedUsers) {
      return cachedUsers;
    }

    await sleep(3000);
    const users = [
      { id: '1', name: 'Albert' },
      { id: '2', name: 'Juan' },
    ];
    await this.cacheManager.set(usersCacheKey, users, 1000 * 10);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
