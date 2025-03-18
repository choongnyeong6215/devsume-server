import { ObjectId } from "mongoose";

export type PortfolioType = "url" | "pdf";

export type ResumeStatus = "temporary" | "completed";

type LanguageType = "engllish" | "japanese" | "chinese";

type LanguageLevel = "daily" | "business" | "native";

type EducationType =
  | "private"
  | "high"
  | "associate"
  | "bachelor"
  | "master"
  | "doctor";

type EducationStatus = "graduation" | "attending" | "completion";

export interface Portfolio extends Record<PortfolioType, string> {}

interface Career {
  name: string;
  position: string;
  part: string;
  duration: string;
  detail: string;
}

interface Activity {
  name: string;
  organization: string;
  duration: string;
  detail: string;
}

interface Certification {
  name: string;
  level: string;
  organization: string;
  duration: string;
}

interface Language {
  type: LanguageType;
  level: LanguageLevel;
}

interface Education {
  kind: EducationType;
  organization: string;
  major: string;
  status: EducationStatus;
  duration: string;
}

type TechStack = String[];

interface Project {
  name: string;
  organization: string;
  duration: string;
  detail: string;
}

interface OptionDetail {
  career: Career[];
  activity: Activity[];
  certification: Certification[];
  language: Language[];
  education: Education[];
  techStack: TechStack;
  project: Project[];
}

export interface Resume extends Document {
  _id: ObjectId;
  userId: ObjectId;
  profileImg: string;
  name: string;
  email: string;
  introduction: string;
  portfolio?: Portfolio[];
  status: ResumeStatus;
  options?: OptionDetail;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
