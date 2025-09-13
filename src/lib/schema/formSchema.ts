import z from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.", 
  }),
  context: z
    .string()
    .max(300, {
      message: "Context must not exceed 300 characters.",
    })
    .optional(),
});
