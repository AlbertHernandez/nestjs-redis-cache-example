import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
