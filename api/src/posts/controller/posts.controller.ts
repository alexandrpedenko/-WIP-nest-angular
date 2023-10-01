import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserIsAuthorGuard } from '@guards/user-is-author.guard';
import { CreatePostDto, UpdatePostDto } from '@posts/dto/request';
import { POST_RESPONSE_MESSAGES } from '@constants/posts';
import { PostDocument } from '@posts/schemas/post.schema';
import { PostsService } from '@posts/service/posts.service';
import { PostResponseDto } from '@posts/dto/response';
import { GetEntityDto } from '@dtos/request';
import { JwtAuthGuard } from '@auth/guards';
import { Serialize } from '@decorators/serialize.decorator';

@Serialize(PostResponseDto)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostDocument> {
    return await this.postsService.createPost(createPostDto);
  }

  @Get('feed/:userId')
  async getPostsExcludeCurrentUsers(
    @Param('userId') userId: string,
    @Query() query: GetEntityDto<PostDocument>
  ): Promise<PostDocument[]> {
    return this.postsService.getPostsExcludeCurrentUsers(userId, query);
  }

  @Get('user/:userId')
  async getPostsByUserId(
    @Param('userId') userId: string,
    @Query() query: GetEntityDto<PostDocument>
  ): Promise<PostDocument[]> {
    return this.postsService.getPostsByUserId(userId, query);
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: string): Promise<PostDocument> {
    return this.postsService.getPostById(postId);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  async deletePostByUser(@Param('postId') postId: string): Promise<{message: string}> {
    return this.postsService.deleteById(postId);
  }

  @Patch(':postId')
  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  async updatePost(
    @Param('postId') postId: string,
    @Body() updateUserDto: UpdatePostDto,
  ): Promise<PostDocument> {
    const isPostExist = await this.postsService.isPostExists(postId);
    if (isPostExist) {
      return this.postsService.updatePost(postId, updateUserDto);
    }
    throw new HttpException(POST_RESPONSE_MESSAGES.postNotFound, HttpStatus.NOT_FOUND);
  }
}
