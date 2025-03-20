declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET_KEY: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    AWS_REGION: string;
    S3_BUCKET_NAME: string;
    S3_ACCESS_KEY_ID: string;
    S3_ACCESS_SECRET_KEY: string;
  }
}
