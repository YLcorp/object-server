import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [ImageModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
