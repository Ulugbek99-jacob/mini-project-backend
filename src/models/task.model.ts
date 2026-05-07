import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "todo" | "in progress" | "done";
  userId: Types.ObjectId; //  SHU MUHIM
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["todo", "in progress", "done"],
    default: "todo"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default model<ITask>("Task", taskSchema);