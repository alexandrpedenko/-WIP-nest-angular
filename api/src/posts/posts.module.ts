import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@users/users.module';
import { PostsRepository } from '@posts/repository/posts.repository';
import { PostModel, PostSchema } from '@posts/schemas/post.schema';
import { PostsController } from '@posts/controller/posts.controller';
import { PostsService } from '@posts/service/posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PostModel.name,
        schema: PostSchema,
      },
    ]),
    UsersModule
  ],
  providers: [PostsRepository, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
