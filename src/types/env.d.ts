declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET_KEY: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    JWT_SECRET_KEY: string;
  }
}
