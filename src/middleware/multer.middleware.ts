import { Request, Response, NextFunction } from "express";
import { Portfolio } from "../types/resume.type";
import { ResumeInputDto } from "../dtos/resume.dto";

// 포트폴리오 업로드 파일 검증 & 가공
export const validateUploadedFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: ResumeInputDto = JSON.parse(req.body.data);

  // 프로필 이미지 필수 업로드 검증
  if (!req.files || !("profile" in req.files)) {
    return next(new Error("프로필 사진은 필수 항목입니다."));
  }

  // Type casting -> .d.ts로 해결하기
  const profile = req.files.profile[0] as Express.MulterS3.File;

  // pdf 확장자 포트폴리오 가공
  const pdf: Portfolio[] = Array.isArray(req.files.portfolio)
    ? req.files.portfolio.map((file: any) => ({
        type: "pdf",
        address: file.location,
      }))
    : [];

  const url: Portfolio[] = data.options.portfolio.map((link) => ({
    type: link.type,
    address: link.address,
  }));

  const portfolio = [...url, ...pdf];

  req.body = {
    ...data,
    profileImg: profile.location,
    options: {
      ...data.options,
      portfolio,
    },
  };

  return next();
};
