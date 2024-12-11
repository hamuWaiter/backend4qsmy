import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as os from 'os'
import process from 'process';

const globalPrefix = 'api';

async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const configService = app.get(ConfigService);
  // const apiConfig = configService.get('api');
  // 代理跨域的api
  app.setGlobalPrefix(globalPrefix);

  // swagger
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api-docs', app, document);
  return app;
}

async function bootstrap() {
  const app = await createApp();
  // app.enableShutdownHooks()
  // await app.listen(3000)

  // const configService = app.get(ConfigService);
  // const apiConfig = configService.get('api');
  // const nestConfig = configService.get('nest');
  // await app.listen(nestConfig.port, '0.0.0.0');
  await app.listen('3000', '0.0.0.0');
  const ip = getIPAddress();
  console.log(`
    start in http://${ip}:3000/${globalPrefix}
    api-doc in http://${ip}:3000/api-docs
    api-doc-json in http://${ip}:3000/api-docs-json
  `);
}

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

bootstrap()
