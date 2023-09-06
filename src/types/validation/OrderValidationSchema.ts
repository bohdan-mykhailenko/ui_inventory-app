import * as Yup from 'yup';

export interface OrderValidationSchema {
  title: Yup.StringSchema<string>;
  date: Yup.StringSchema<string>;
}
