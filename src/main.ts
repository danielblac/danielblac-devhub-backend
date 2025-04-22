import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { cors: true });

//   app.enableCors({
//     origin: ['http://localhost:3000', 'https://danielblacdevhub.com'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
//     credentials: true,
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   await app.listen(8000);
// }
// bootstrap();

// {
//   "version": 2,
//   "builds": [
//       {
//           "src": "dist/main.js",
//           "use": "@vercel/node"
//       }
//   ],
//   "headers": [
//       {
//           "source": "/api/(.*)",
//           "headers": [
//               {
//                   "key": "Access-Control-Allow-Origin",
//                   "value": "http://localhost:3000 https://your-frontend-domain.com"
//               },
//               {
//                   "key": "Access-Control-Allow-Methods",
//                   "value": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
//               },
//               {
//                   "key": "Access-Control-Allow-Headers",
//                   "value": "Content-Type, Authorization, X-Requested-With"
//               },
//               {
//                   "key": "Access-Control-Allow-Credentials",
//                   "value": "true"
//               }
//           ]
//       }
//   ],
//   "rewrites": [
//       {
//           "source": "/api/(.*)",
//           "destination": "/dist/main.js"
//       },
//       {
//           "source": "/(.*)",
//           "destination": "/dist/main.js"
//       }
//   ]
// }
