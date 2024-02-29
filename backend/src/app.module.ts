import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './websocket/socket.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [SocketModule, WebSocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
