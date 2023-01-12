import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import {User} from './user.entity';
import { PostService } from 'src/post/post.service';
import { Like } from 'src/post/like.entity';
import { Comment } from 'src/comment/comment.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        @InjectRepository(Post) private postRepo: Repository<Post>,
        private postService: PostService,
        @InjectRepository(Like) private likeRepo: Repository<Like>,
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    ) {}

    async create(email: string, password: string, name: string){
        
        const user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        user.posts = [];
        user.likes = [];
        user.followers = [];
        user.following = [];
        user.comments = [];
        try {
            await this.repo.save(user);
        }catch(e) {
            if(e.code === '23505') {
                console.log('Duplicate user');
            }
        }
    }

    //function to find user with id
    async findUser(id: string): Promise<User> {
        const user = await this.repo.findOne({
            relations: ['posts', 'likes', 'comments'],
            where: {
                id: id
            },
        });
        return user;
    }

    //function to find user with email
    async findUserByEmail(email: string) {
        const user = await this.repo.findOne({
            where: {
                email: email
            },
        });
        return user;
    }

    //function to follow a user
    async followUser(user_id: string, follow_id: string) {
        const user = await this.findUser(user_id);
        const follow = await this.findUser(follow_id);
        if(user.following.includes(follow_id)) {
            console.log('Already following');
        }else {
            user.following.push(follow_id);
            follow.followers.push(user_id);
            await this.repo.save(user);
            await this.repo.save(follow);
        }
    }

    //function to unfollow a user
    async unfollowUser(user_id: string, unfollow_id: string) {
        const user = await this.findUser(user_id);
        const unfollow = await this.findUser(unfollow_id);
        user.following = user.following.filter(id => id !== unfollow_id);
        unfollow.followers = unfollow.followers.filter(id => id !== user_id);
        await this.repo.save(user);
        await this.repo.save(unfollow);
    }
        

    //function to get liked post
    async getLikedPosts(user_id: string) {
        const user = await this.findUser(user_id);
        return user.likes;
    }

    // function to like a post 
    async likePost(post_id: string, user_id: string) {
        const user = await this.findUser(user_id);
        const post = await this.postService.findPost(post_id);
        const like = new Like();
        like.post = post;
        like.user = user;
        like.post_id = post.id;
        like.user_id = user.id;
        await this.repo.save(user);
        await this.postRepo.save(post);
        await this.likeRepo.save(like);
    }

    // function to unlike a post
    async unlikePost(post_id: string, user_id: string) {
        
        const like = await this.likeRepo.findOne({
            where: {
                post_id: post_id,
                user_id: user_id
            }
        });
        await this.likeRepo.remove(like);
    }


    //function to get all posts of a user
    async getPosts(user_id: string) {
        const user = await this.findUser(user_id);
        console.log(user.posts);
        return user.posts;
    }

    //function to post from user
    async createPostUser(title: string, description: string, userId: string): Promise<Post> {
        const post = new Post();
        post.title = title;
        post.description = description;
        post.created_at = new Date();
        console.log(userId);
        const user = await this.findUser(userId);
        post.user = user;
        user.posts.push(post);
        await this.repo.save(user);
        return await this.postRepo.save(post);
      }

      // function to get posts of user
      async getposts(userId: string) {
        const user = await this.repo.findOne({
            relations: ['posts'],
            where: {
                id: userId
            },
        });
        console.log(user.posts);
        return user.posts;
    }
    

    //function to post comment on post
    async commentOnPost(post_id: string, user_id: string, commentText: string) {
        const post = await this.postService.findPost(post_id);
        const user = await this.findUser(user_id);
        const comment = new Comment();
        comment.post = post;
        comment.user = user;
        comment.postId = post.id;
        comment.userId = user.id;
        comment.comment = commentText;
        comment.created_at = new Date();
        console.log(comment);
        await this.repo.save(user);
        await this.postRepo.save(post);
        await this.commentRepo.save(comment);
    }

    //function to get comments on post
    async getComments(post_id: string) {
        const post = await this.postService.findPost(post_id);
        console.log(post);
        return post.comments;
    }
}
