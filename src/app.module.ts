import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProjectsModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
