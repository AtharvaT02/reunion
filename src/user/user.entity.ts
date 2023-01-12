import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Like } from '../post/like.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Column({ type: 'simple-array' })
  followers: string[];

  @Column({ type: 'simple-array' })
  following: string[];


  @AfterInsert()
    logInsert() {
        console.log("Inserted user with id " + this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated user with id " + this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("Removed user with id " + this.id);
    }
}
