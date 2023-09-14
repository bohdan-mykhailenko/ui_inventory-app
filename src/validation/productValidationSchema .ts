import * as Yup from 'yup';
import { ProductFormData } from '../types/Product';

export const productValidationSchema = Yup.object<ProductFormData>({
  serialNumber: Yup.string().required('Serial Number is required'),
  isNew: Yup.boolean().required('Is New is required'),
  isRepairing: Yup.boolean().required('Is Repairing is required'),
  // photo: Yup.mixed().required('Photo is required'),
  title: Yup.string().trim().required('Title is required'),
  type: Yup.string()
    .required('Type is required')
    .test('is-not-default', 'Type is required', (value) => value !== 'default'),
  specification: Yup.string(),
  order_id: Yup.number().required('Order is required'),
  date: Yup.string()
    .required('Date is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date must be in the format YYYY-MM-DD (e.g., 2023-09-05)',
    ),
  guaranteeStart: Yup.string().required('Guarantee Start is required'),
  guaranteeEnd: Yup.string().required('GuaranteeEnd is required'),
  priceUSD: Yup.number().required('Price in USD is required'),
  priceUAH: Yup.number().required('Price in UAH is required'),
});
