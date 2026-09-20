import mongoose, { Schema, type InferSchemaType } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    questionAr: { type: String, default: "", trim: true },
    answerHtml: { type: String, default: "" },
    answerHtmlAr: { type: String, default: "" },
    answerJson: { type: Schema.Types.Mixed, default: null },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

faqSchema.index({ order: 1 });

export type FaqDocument = InferSchemaType<typeof faqSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Faq = mongoose.model("Faq", faqSchema);
