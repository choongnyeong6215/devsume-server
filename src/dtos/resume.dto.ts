import { OptionDetail, ResumeStatus } from "../types/resume.type";

export interface ResumeInputDto {
  oauthId: string;
  profileImg: string;
  name: string;
  email: string;
  introduction: string;
  options?: OptionDetail;
  status: ResumeStatus;
}

export interface updateResumeInputDto {
  oauthId: string;
  profileImg?: string;
  name?: string;
  email?: string;
  introduction?: string;
  options?: OptionDetail;
  status?: ResumeStatus;
}
