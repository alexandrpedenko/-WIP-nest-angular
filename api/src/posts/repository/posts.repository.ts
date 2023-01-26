import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@database/entity.repository';
import { PostDocument, PostModel } from '@posts/schemas/post.schema';

@Injectable()
export class PostsRepository extends EntityRepository<PostDocument> {
  constructor(@InjectModel(PostModel.name) postModel: Model<PostDocument>) {
    super(postModel);
  }
}
