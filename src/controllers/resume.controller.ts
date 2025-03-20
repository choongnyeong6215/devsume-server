import { NextFunction, Request, Response } from "express";
import * as resumeService from "../services/resume.service.ts";
import { ResumeInputDto, updateResumeInputDto } from "../dtos/resume.dto.ts";
import { User } from "../types/user.type.ts";

export const createResume = async (
  req: Request<{}, {}, ResumeInputDto>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  const resumeInput: ResumeInputDto = JSON.parse(req.body.data);

  if (!req.file) {
    throw new Error("프로필 이미지 업로드 에러.");
  }

  try {
    const newResume = await resumeService.createResume(
      user.oauthId,
      req.file.location,
      resumeInput
    );

    res.status(201).json(newResume);
  } catch (err) {
    next(err);
  }
};

export const getResume = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  const { id } = req.params;

  try {
    const resume = await resumeService.getResumeById(user.oauthId, id);

    if (!resume) {
      res.status(404).json({
        message: "작성한 이력서가 없습니다.",
      });
    }

    res.status(200).json(resume);
  } catch (err) {
    next(err);
  }
};

export const getAllResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;

  try {
    const allResume = await resumeService.getAllResume(user.oauthId);

    if (!allResume.length) {
      res.status(404).json({
        message: "작성한 이력서가 없습니다.",
      });
    }

    res.status(200).json(allResume);
  } catch (err) {
    next(err);
  }
};

export const updateResume = async (
  req: Request<{ id: string }, {}, updateResumeInputDto>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const resumeInput = JSON.parse(req.body.data);

  if (!req.file) {
    throw new Error("프로필 이미지 업로드 에러.");
  }

  try {
    await resumeService.updateResume(id, req.file.location, resumeInput);

    res.status(200).json({
      message: "이력서가 수정되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteResume = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  const { id } = req.params;

  try {
    const result = await resumeService.deleteResume(user.oauthId, id);

    if (result.deletedCount === 0) {
      res.status(404).json({
        message: "이미 삭제된 이력서입니다.",
      });
    }

    res.status(200).json({
      message: "이력서가 삭제되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};
