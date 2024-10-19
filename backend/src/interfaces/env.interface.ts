export type EnvironmentConfig = {
  app: {
    port: number;
  };
  database: {
    uri: string;
  };
  jwt: {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    accessTokenExpire: string;
    refreshTokenExpire: string;
  };
};
