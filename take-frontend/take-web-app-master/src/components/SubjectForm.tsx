import { FC } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { jsSubmit } from '../utils/js-submit';
import { SubjectSchemaType } from '../validation-schemas/subject';

type SubjectFormProps = {
  loading: boolean;
  disableSubmit: boolean;

  submit: () => void;
  errors: FieldErrors<SubjectSchemaType>;
  register: UseFormRegister<SubjectSchemaType>;
};

const SubjectForm: FC<SubjectFormProps> = ({ register, errors, submit, loading, disableSubmit }) => (
  <Grid>
    <Grid.Col span={6}>
      <TextInput {...register('name')} error={errors.name?.message} label="Name" withAsterisk />
    </Grid.Col>

    <Grid.Col span={10}>
      <Button loading={loading} disabled={disableSubmit} onClick={jsSubmit(submit)}>
        Proceed and close
      </Button>
    </Grid.Col>
  </Grid>
);

export { SubjectForm };
export type { SubjectFormProps };
