import { z } from "zod";

export const optionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Option text is required")
});

export const questionSchema = z.object({
  topicId: z.string().min(1),
  prompt: z.string().min(8),
  explanation: z.string().min(8),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
  companyTags: z.string().optional(),
  published: z.boolean().default(true),
  options: z.array(optionSchema).min(2).max(6),
  correctOptionIndex: z.coerce.number().int().min(0)
});

export const submitAttemptSchema = z.object({
  topicSlug: z.string().min(1),
  firebaseUid: z.string().min(1),
  email: z.string().email().optional(),
  displayName: z.string().optional(),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedOptionId: z.string().nullable().optional()
    })
  )
});
