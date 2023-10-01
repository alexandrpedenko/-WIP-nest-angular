import { Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '@posts/dto/request';
import { PostsRepository } from '@posts/repository/posts.repository';
import { UsersRepository } from '@users/repository/users.repository';
import { PostDocument } from '@posts/schemas/post.schema';
import { GetEntityDto } from '@dtos/request';

@Injectable()
export class PostsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly postRepository: PostsRepository
  ) {}

  public async createPost(createPostDto: CreatePostDto): Promise<PostDocument> {
    const cratedPost = await this.postRepository.create({
      author: createPostDto.author,
      title: createPostDto.title,
      description: createPostDto.description,
      createdDate: new Date(Date.now()),
    });

    await this.userRepository.findOneAndUpdate({
      entityFilterQuery: { _id: createPostDto.author },
      updateOperators: { "$push": { "posts": cratedPost._id } },
    });

    return cratedPost;
  }

  public async getPostsByUserId(userId: string, query: GetEntityDto<PostDocument>): Promise<PostDocument[]> {
    return await this.postRepository.find({
      findQuery: { 'author': new Types.ObjectId(userId) },
      ...query,
    });
  }

  public async getPostsExcludeCurrentUsers(userId: string, query: GetEntityDto<PostDocument>): Promise<PostDocument[]> {
    return await this.postRepository.find({
      findQuery: { 'author': { $nin: [new Types.ObjectId(userId)] } },
      ...query,
    });
  }

  public async getPostById(postId: string) {
    return await this.postRepository.findOne({ _id: postId });
  }

  public async deleteById(postId: string): Promise<{message: string}> {
    const deletedPost = await this.postRepository.delete({ _id: postId });
    if (deletedPost) {
      return { message: 'Post deleted successfully'}
    }

    throw new HttpException('Error during post deleting process', HttpStatus.NOT_FOUND);
  }

  async updatePost(
    _id: string,
    postUpdateData: UpdatePostDto,
  ): Promise<PostDocument> {
    return await this.postRepository.findOneAndUpdate({
      entityFilterQuery: { _id },
      entityData: postUpdateData,
    });
  }

  async isPostExists(_id: string): Promise<boolean> {
    const existedPost = await this.postRepository.findOne({ _id });
    if (existedPost) {
      return true;
    }
    return false;
  }
}
