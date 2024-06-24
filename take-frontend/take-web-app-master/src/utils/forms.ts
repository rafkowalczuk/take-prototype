import { ChangeEvent, SetStateAction } from 'react';

const createOnChangeValueUpdater = (updater: SetStateAction<any>) => (event: ChangeEvent<HTMLInputElement>) => {
  updater(event.target.value);
};

const update = createOnChangeValueUpdater;

export { createOnChangeValueUpdater, update };
