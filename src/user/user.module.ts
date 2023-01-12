import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PostModule } from 'src/post/post.module';
import { Post } from 'src/post/post.entity';
import { Like } from 'src/post/like.entity';
import { Comment } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Post, Like, Comment]) ,PostModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
