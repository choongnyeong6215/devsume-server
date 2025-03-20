import { ResumeStatus } from "../types/resume.type";
import { Provider } from "./../types/user.type";

export const PROVIDER: Record<Provider, Provider> = {
  local: "local",
  kakao: "kakao",
};

export const STATUS: Record<ResumeStatus, ResumeStatus> = {
  temporary: "temporary",
  completed: "completed",
};
