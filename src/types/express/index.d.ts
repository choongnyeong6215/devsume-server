declare global {
  namespace Express {
    interface Request {
      files?: {
        profile: Express.MulterS3.File[];
        portfolio?: Express.MulterS3.File[];
      };
    }
  }
}
