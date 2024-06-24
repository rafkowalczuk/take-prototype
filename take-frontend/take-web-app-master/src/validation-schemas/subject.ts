import * as z from 'zod';

type SubjectSchemaType = {
  name: string;
};

const SubjectValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(60, { message: 'First name must be at most 30 characters long' }),
});

export { SubjectValidationSchema };
export type { SubjectSchemaType };
