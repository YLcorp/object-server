import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { DocumentModule } from './document/document.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './repo/database';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ImageModule,
    DocumentModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `./.${process.env.NODE_ENV}.env`
        : './.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
