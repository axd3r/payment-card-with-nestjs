import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get('MONGO_USER')}:${config.get('MONGO_PASS')}@${config.get('MONGO_HOST')}/${config.get('MONGO_DB')}`,
      }),
    }),

    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
