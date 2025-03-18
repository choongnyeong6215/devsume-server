import { Resume } from "../types/resume.type";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<Resume>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    portfolio: [
      {
        type: {
          type: String,
          enum: ["url", "pdf"],
        },
        address: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["temporary", "completed"],
    },
    options: {
      career: [
        {
          name: { type: String },
          position: { type: String },
          part: { type: String },
          duration: { type: String },
          detail: { type: String },
        },
      ],
      activity: [
        {
          name: { type: String },
          organization: { type: String },
          duration: { type: String },
          detail: { type: String },
        },
      ],
      certification: [
        {
          name: { type: String },
          level: { type: String },
          organization: { type: String },
          duration: { type: String },
        },
      ],
      language: [
        {
          type: {
            type: String,
            enum: ["english", "japanese", "chinese"],
          },
          level: {
            type: String,
            enum: ["daily", "business", "native"],
          },
        },
      ],
      education: [
        {
          type: {
            type: String,
            enum: [
              "private",
              "high",
              "associate",
              "bachelor",
              "master",
              "doctor",
            ],
          },
          organization: { type: String },
          major: { type: String },
          status: {
            type: String,
            enum: ["graduation", "attending", "completion"],
          },
          duration: { type: String },
        },
      ],
      techStack: [
        {
          type: [String],
        },
      ],
      project: [
        {
          name: { type: String },
          organization: { type: String },
          duration: { type: String },
          detail: { type: String },
        },
      ],
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 9 * 60 * 60 * 1000),
    },
  }
);

const ResumeModel = mongoose.model<Resume>("Resume", resumeSchema);

export default ResumeModel;
