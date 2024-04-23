import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.schema';
import { Model } from 'mongoose';
import {
  CreateAccountRequest,
  GetAccountRequest,
} from 'dist/libs/shared/protos/account';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async register(newUser: CreateAccountRequest): Promise<User> {
    const dbUser = await this.userModel.find({ username: newUser.username });
    if (dbUser) {
      throw new RpcException('user already exists');
    }
    const user = new this.userModel(newUser);
    return user.save();
  }

  async findById(data: GetAccountRequest): Promise<User> {
    const dbUser = await this.userModel.findById(data.accountId);
    if (!dbUser) {
      throw new RpcException('user not found');
    }
    return dbUser;
  }
}
