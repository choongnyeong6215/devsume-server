import { STATUS } from "../constants";
import { ResumeInputDto, updateResumeInputDto } from "../dtos/resume.dto";
import ResumeModel from "../models/resume.model";
import { v4 as uuidv4 } from "uuid";

export const createResume = async (resumeInput: ResumeInputDto) => {
  const { oauthId, name, email, profileImg, introduction, options, status } =
    resumeInput;

  const newResume = new ResumeModel({
    resumeId: uuidv4(),
    oauthId,
    profileImg,
    name,
    email,
    introduction,
    status: status === STATUS.completed ? STATUS.completed : STATUS.temporary, // 클라이언트에서 전달
    options,
  });

  return await newResume.save();
};

export const getResumeById = async (oauthId: string, resumeId: string) => {
  return await ResumeModel.findOne({ oauthId, resumeId });
};

export const getAllResume = async (oauthId: string) => {
  return await ResumeModel.find({ oauthId });
};

export const updateResume = async (
  resumeId: string,
  updateInput: updateResumeInputDto
) => {
  const { oauthId, name, email, profileImg, introduction, options, status } =
    updateInput;

  return await ResumeModel.updateOne(
    { resumeId, oauthId },
    {
      $set: {
        name,
        email,
        profileImg,
        introduction,
        options,
        status, // 임시 저장 -> 완료 가능
      },
    },
    {
      new: true,
    }
  );
};

export const deleteResume = async (oauthId: string, resumeId: string) => {
  return await ResumeModel.deleteOne({ oauthId, resumeId });
};
