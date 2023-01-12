import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @ManyToOne(()=> User, user => user.likes)
  user: User;

  @ManyToOne(() => Post, post => post.likes)
  post: Post;
}