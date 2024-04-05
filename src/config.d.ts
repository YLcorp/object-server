type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type AppConfig = {
  postgres: DatabaseConfig;
  app: {
    nodeEnv: string;
  };
};
