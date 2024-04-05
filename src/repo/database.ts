import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppConfig } from 'src/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AppConfig>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configService.get('postgres.host', { infer: true }),
      port: this.configService.get('postgres.port', { infer: true }),
      username: this.configService.get('postgres.username', { infer: true }),
      password: this.configService.get('postgres.password', { infer: true }),
      database: this.configService.get('postgres.database', { infer: true }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging:
        this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      extra: {
        max: this.configService.get('postgres.maxConnections', { infer: true }),
        ssl: this.configService.get('postgres.sslEnabled', { infer: true })
          ? {
              rejectUnauthorized: true,
              ca:
                this.configService.get('postgres.ca', {
                  infer: true,
                }) ?? undefined,
              key:
                this.configService.get('postgres.key', { infer: true }) ??
                undefined,
              cert:
                this.configService.get('postgres.cert', {
                  infer: true,
                }) ?? undefined,
            }
          : undefined,
      },
    };
  }
}
