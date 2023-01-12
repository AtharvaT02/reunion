import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/create')
    create(@Body() body) {
        return this.userService.create(body.email, body.password, body.name);
    }

    @Get('/find/:id')
    findUser(@Param('id') id) {
        return this.userService.findUser(id);
    }

    @Get('/find/email')
    findUserByEmail(email: string) {
        return this.userService.findUserByEmail(email);
    }

    @Post('/createpost')
    createPostUser(@Body() body) {
        return this.userService.createPostUser(body.title, body.description, body.userId);
    }

    @Get('/postsofuser/:id')
    postsOfUser(@Param('id') id) {
        return this.userService.getposts(id);
    }

    @Post('/likepost')
    postLike(@Body() body) {
        console.log(body);
        return this.userService.likePost(body.postId, body.userId);
    }

    @Get('/likedposts/:id')
    likedPosts(@Param('id') id) {
        return this.userService.getLikedPosts(id);
    }

    @Post('/unlikepost')
    unlikePost(@Body() body) {
        console.log(body);
        return this.userService.unlikePost(body.postId, body.userId);
    }

    @Post('/follow')
    followUser(@Body() body) {
        return this.userService.followUser(body.follower_id, body.following_id);
    }

    @Post('/unfollow')
    unfollowUser(@Body() body) {
        return this.userService.unfollowUser(body.follower_id, body.following_id);
    }

    @Post('/comment')
    commmentPost(@Body() body) {
        return this.userService.commentOnPost(body.postId, body.userId, body.comment);
    }

    @Get('/comments/:id')
    getComments(@Param('id') id) {
        return this.userService.getComments(id);
    }
}
