import { FieldDefinitionFieldsFragment, FragmentFields } from '@aegis/shared';

export type StringConfiguration = {
  maxLength?: number;
  minLength?: number;
  regexPattern?: string;
};

export type NumberConfiguration = {
  min?: number;
  max?: number;
  decimalPlaces?: number;
};

export type EnumConfiguration = {
  allowedValues: string[];
};
export type BaseFieldDefinitionDetailsModel = FragmentFields<FieldDefinitionFieldsFragment>;

type WithConfiguration<T extends BaseFieldDefinitionDetailsModel> = T['type'] extends 'STRING'
  ? StringConfiguration
  : T['type'] extends 'NUMBER'
    ? NumberConfiguration
    : T['type'] extends 'ENUM'
      ? EnumConfiguration
      : never;

export type FieldDefinitionDetailsModel = BaseFieldDefinitionDetailsModel & {
  configuration?: WithConfiguration<BaseFieldDefinitionDetailsModel>;
};
