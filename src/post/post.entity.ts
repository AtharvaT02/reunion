import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany , ManyToMany, JoinColumn, JoinTable} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Like } from '../post/like.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  //column to save likes
  @OneToMany(type => Like, like => like.post)
  likes: Like[];

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}
