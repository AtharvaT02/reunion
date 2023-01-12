import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async createComment( commentText: string, user_id: string, post_id: string) {
        const comment = new Comment();
        comment.comment = commentText;
        comment.created_at = new Date();
        await this.commentRepository.save(comment);
    }
    

}
