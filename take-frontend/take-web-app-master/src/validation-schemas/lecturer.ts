import * as z from 'zod';

type LecturerSchemaType = {
  firstName: string;
  lastName: string;
  email: string;
};

const LecturerValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(30, { message: 'First name must be at most 30 characters long' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(30, { message: 'Last name must be at most 30 characters long' }),
  email: z.string().email({ message: 'E-mail must be valid' }),
});

export { LecturerValidationSchema };
export type { LecturerSchemaType };
