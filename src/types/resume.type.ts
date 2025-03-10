import { ObjectId } from "mongoose";

enum ResumeStatus {
  TEMPORARY = "temporary",
  COMPLETED = "completed",
}

enum Options {
  CAREER = "career",
  ACTTIVITY = "acttivity",
  CERTIFICATION = "certification",
  EDUCATION = "education",
  TECHSTACK = "techStack",
  PROJECT = "project",
}

enum LanguageKind {
  ENGLLISH = "engllish",
  JAPANESE = "japanese",
  CHINESE = "chinese",
}

enum LanguageLevel {
  DAILY = "daily",
  BUSINESS = "business",
  NATIVE = "native",
}

enum EducationKind {
  PRIVATE = "private",
  HIGH = "high",
  ASSOCIATE = "associate",
  BACHELOR = "bachelor",
  MASTER = "master",
  DOCTOR = "doctor",
}

enum EducationStatus {
  GRADUATION = "graduation",
  ATTENDING = "attending",
  COMPLETION = "completion",
}

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
  kind: LanguageKind;
  level: LanguageLevel;
}

interface Education {
  kind: EducationKind;
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

interface Contents {
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
  urls?: string;
  pdfs?: string;
  status: ResumeStatus;
  options: Options;
  contents: Contents;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
