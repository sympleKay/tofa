import { Schema, model } from "mongoose";

export const Photo = model(
  "Photo",
  new Schema(
    {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      albumId: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      thumbnailUrl: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
