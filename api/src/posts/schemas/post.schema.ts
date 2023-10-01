import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PostDocument = PostModel & Document;

@Schema({
  collection: 'posts',
})
export class PostModel {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  createdDate: Date;

  @Prop({ type: Date })
  editedDate: Date;

  @Prop()
  image: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
