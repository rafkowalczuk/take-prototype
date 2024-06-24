import { FC } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { update } from '../utils/forms';
import { jsSubmit } from '../utils/js-submit';
import { StudentSchemaType } from '../validation-schemas/student';

type StudentFormProps = {
  errors: FieldErrors<StudentSchemaType>;
  submit: () => void;
  loading: boolean;
  submitDisabled: boolean;
  register: UseFormRegister<StudentSchemaType>;
};

const StudentForm: FC<StudentFormProps> = ({ submitDisabled, submit, errors, loading, register }) => (
  <Grid maw={700}>
    <Grid.Col span={6}>
      <TextInput error={errors.firstName?.message} {...register('firstName')} withAsterisk label="Name" />
    </Grid.Col>
    <Grid.Col span={6}>
      <TextInput error={errors.lastName?.message} {...register('lastName')} withAsterisk label="Surname" />
    </Grid.Col>

    <Grid.Col span={8}>
      <TextInput error={errors.email?.message} {...register('email')} withAsterisk label="E-mail" />
    </Grid.Col>

    <Grid.Col span={10}>
      <Button disabled={submitDisabled} loading={loading} onClick={jsSubmit(submit)}>
        Proceed and close
      </Button>
    </Grid.Col>
  </Grid>
);

export { StudentForm };
export type { StudentFormProps };
