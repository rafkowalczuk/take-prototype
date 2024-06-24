import { FC } from 'react';
import { Button, Grid, MultiSelect, TextInput } from '@mantine/core';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Subject } from '../model/existing-objects/Subject';
import { jsSubmit } from '../utils/js-submit';
import { LecturerSchemaType } from '../validation-schemas/lecturer';

type LecturerFormProps = {
  subjectIds: string[];
  setSubjectIds: (arg: string[]) => void;
  subjects: Subject[];

  submit: () => void;
  disableSubmit: boolean;
  loading: boolean;
  errors: FieldErrors<LecturerSchemaType>;
  register: UseFormRegister<LecturerSchemaType>;
};

const LecturerForm: FC<LecturerFormProps> = ({
  register,
  errors,
  subjects,
  submit,
  loading,
  disableSubmit,
  setSubjectIds,
  subjectIds,
}) => (
  <Grid>
    <Grid.Col span={6}>
      <TextInput {...register('firstName')} error={errors.firstName?.message} withAsterisk label="Name" />
    </Grid.Col>
    <Grid.Col span={6}>
      <TextInput {...register('lastName')} error={errors.lastName?.message} withAsterisk label="Surname" />
    </Grid.Col>

    <Grid.Col span={8}>
      <TextInput {...register('email')} error={errors.email?.message} withAsterisk label="E-mail" />
    </Grid.Col>

    <Grid.Col span={12}>
      <MultiSelect
        hidePickedOptions
        label="Subjects"
        placeholder="Select subjects"
        data={(subjects as Subject[]).map((s) => ({
          value: s.id.toString(),
          label: s.name,
        }))}
        defaultValue={subjectIds}
        onChange={(e) => setSubjectIds(e)}
      />
    </Grid.Col>

    <Grid.Col span={10}>
      <Button disabled={disableSubmit} loading={loading} onClick={jsSubmit(submit)}>
        Proceed and close
      </Button>
    </Grid.Col>
  </Grid>
);

export { LecturerForm };

export type { LecturerFormProps };
