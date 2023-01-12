import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @Column()
  comment: string;

  @Column()
  created_at: Date;

  @Column()
  userId: string;

  @Column()
  postId: string;
}
