import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserByOpenId(openId: string) {
    return await this.userModel.findOne({ openId });
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async userSignUp(data: any) {
    const { openId } = data;

    const exists = await this.getUserByOpenId(openId);
    if (exists) return exists;

    const user = new this.userModel({
      openId,
      ...data,
    });
    const result = await user.save();
    return result;
  }

  async getUsers() {
    return await this.userModel.find();
  }
}
