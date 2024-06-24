import * as z from 'zod';

type StudentLoginSchemaType = {
  email: string;
};

const StudentLoginValidationSchema = z.object({
  email: z.string().email({ message: 'E-mail must be valid' }),
});

export { StudentLoginValidationSchema };
export type { StudentLoginSchemaType };
