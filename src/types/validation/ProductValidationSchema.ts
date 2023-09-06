import * as Yup from 'yup';

const priceItemSchema = Yup.object().shape({
  value: Yup.number().required('Price value is required'),
  symbol: Yup.string().required('Price symbol is required'),
  isDefault: Yup.number().required('Is Default is required'),
});

export interface ProductValidationSchema {
  id: Yup.Schema<number>;
  serialNumber: Yup.Schema<number>;
  isNew: Yup.Schema<boolean>;
  isRepairing: Yup.Schema<boolean>;
  photo: Yup.Schema<string>;
  title: Yup.Schema<string>;
  type: Yup.Schema<string>;
  specification: Yup.Schema<string>;
  guarantee: Yup.ObjectSchema<{
    start: string;
    end: string;
  }>;
  price: Yup.ArraySchema<typeof priceItemSchema>;
  order: Yup.Schema<number>;
  date: Yup.Schema<string>;
}
