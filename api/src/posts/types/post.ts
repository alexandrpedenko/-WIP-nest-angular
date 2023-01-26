import { Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

export class PostType {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString(), { toClassOnly: true })
  _id: string;

  @Expose()
  @Type(() => String)
  author: Types.ObjectId;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdDate: Date;

  @Expose()
  editedDate?: Date;

  @Expose()
  image?: string;
}