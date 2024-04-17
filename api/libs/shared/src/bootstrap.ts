import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const MicroserviceInit = async (
  packageName: string,
  path: string,
  module: unknown,
  port: string | number
) => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    module,
    {
      transport: Transport.GRPC,

      options: {
        package: packageName,
        protoPath: join(__dirname, `../protos/${path}`),
        url: `localhost:${port}`,
      },
    }
  );

  return app;
};
export default MicroserviceInit;
