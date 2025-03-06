import { Resume } from "./../types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<Resume>({
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
  urls: [
    {
      type: String,
    },
  ],
  pdfs: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["temporary", "completed"],
  },
  options: {
    type: String,
    enum: [
      "career",
      "acttivity",
      "certification",
      "education",
      "techStack",
      "project",
    ],
    contents: {
      career: [
        {
          name: {
            type: String,
          },
          position: {
            type: String,
          },
          part: {
            type: String,
          },
          duration: {
            type: String,
          },
          detail: {
            type: String,
          },
        },
      ],
      activity: [
        {
          name: {
            type: String,
          },
          organization: {
            type: String,
          },
          duration: {
            type: String,
          },
          detail: {
            type: String,
          },
        },
      ],
      certification: {
        name: {
          type: String,
        },
        level: {
          type: String,
        },
        organization: {
          type: String,
        },
        duration: {
          type: String,
        },
      },
      language: {
        kind: {
          type: String,
          enum: ["engilish", "japanese", "chinese"],
        },
        level: {
          type: String,
          enum: ["daily", "business", "native"],
        },
      },
      education: [
        {
          kind: {
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
          organization: {
            type: String,
          },
          major: {
            type: String,
          },
          status: {
            type: String,
            enum: ["graduation", "attending", "completion"],
          },
          duration: {
            type: String,
          },
        },
      ],
      techStack: [
        {
          type: [String],
        },
      ],
      project: [
        {
          name: {
            type: String,
          },
          organization: {
            type: String,
          },
          duration: {
            type: String,
          },
          detail: {
            type: String,
          },
        },
      ],
    },
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
