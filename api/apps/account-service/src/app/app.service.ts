import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.schema';
import { Model } from 'mongoose';
import {
  CreateAccountRequest,
  GetAccountRequest,
} from 'dist/libs/shared/protos/account';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async register(newUser: CreateAccountRequest): Promise<User> {
    const dbUser = await this.userModel
      .find({
        $or: [
          { username: newUser.username },
          {
            email: newUser.email,
          },
        ],
      })
      .where({});
    if (dbUser.length) {
      throw new RpcException({
        code: 6,
        message: 'user already exists',
        status: status.ALREADY_EXISTS,
      });
    }
    const user = new this.userModel(newUser);
    const registeredUser = await user.save();
    return registeredUser;
  }

  async findById(data: GetAccountRequest): Promise<User> {
    const dbUser = await this.userModel.findById(data.accountId);
    if (!dbUser) {
      throw new RpcException({
        code: 5,

        message: 'user not found',
      });
    }
    return dbUser;
  }
}
