import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const MicroserviceInit = async (
  packageName: string,
  path: string,
  module: unknown,
  port: number
) => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    module,
    {
      transport: Transport.GRPC,
      options: {
        package: packageName,
        protoPath: path,
        url: `localhost:${port}`,
      },
    }
  );

  return app;
};
export default MicroserviceInit;
