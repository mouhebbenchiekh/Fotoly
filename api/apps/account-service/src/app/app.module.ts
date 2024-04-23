import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from 'libs/shared/src/lib/shared.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.schema';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'account_package',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          protoPath: './dist/libs/shared/protos/account.proto',
        },
      },
    ]),
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
