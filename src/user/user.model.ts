import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ require: true })
  name: string;
  @Prop({ require: true })
  email: string;
  @Prop({ require: false })
  avtarUrl: string;
  @Prop({ require: false, default: false })
  emailVerified: boolean;
  @Prop({ require: false })
  openId: string;
  @Prop({ require: false })
  provider: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
