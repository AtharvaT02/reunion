import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
@Injectable()
export class PostService {
    
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async createPost(title: string, description: string) {
    const post = new Post();
    post.title = title;
    post.description = description;
    post.created_at = new Date();
    post.likes = [];
    // post.comments = [];
    await this.postRepository.save(post);
  }
    
    async findPost(id: string) {
        const post = await this.postRepository.findOne({
            where: {
                id: id
            },
        });
        return post;
    }

    //delete post
    async deletePost(id: string) {
        const post = await this.findPost(id);
        await this.postRepository.remove(post);
    }

}
