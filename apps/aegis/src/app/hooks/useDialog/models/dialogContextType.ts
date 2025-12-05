import { DialogOptions } from './dialogOptions';

export type DialogContextType = {
  showDialog: (options: Omit<DialogOptions, 'id'>) => string;
  closeDialog: (id: string) => void;
};
