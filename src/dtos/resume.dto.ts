import { OptionDetail, Portfolio, ResumeStatus } from "../types/resume.type";

export interface ResumeInputDto {
  data?: string; // form-data
  profileImg: string;
  name: string;
  email: string;
  introduction: string;
  portfolio: Portfolio[];
  options?: OptionDetail;
  status: ResumeStatus;
}

export interface updateResumeInputDto {
  data?: string; // form-data
  profileImg?: string;
  name?: string;
  email?: string;
  introduction?: string;
  portfolio?: Portfolio[];
  options?: OptionDetail;
  status?: ResumeStatus;
}
