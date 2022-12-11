import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema({
  collection: 'users',
})
export class UserModel {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true })
  userName: string;

  @Prop()
  refreshToken: string;

  @Prop()
  profileImage: string;

  @Prop()
  occupation: string;

  @Prop()
  company: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
