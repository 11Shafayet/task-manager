import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dutyTime: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['manager', 'supervisor', 'chef', 'deliveryMan'],
      required: true,
    },
    assignedDuty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model('User', userSchema);
