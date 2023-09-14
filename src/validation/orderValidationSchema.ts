import * as Yup from 'yup';
import { Order } from '../types/Order';

export const orderValidationSchema = Yup.object<Partial<Order>>({
  title: Yup.string().trim().required('Title is required'),
  date: Yup.string()
    .required('Date is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date must be in the format YYYY-MM-DD (e.g., 2023-09-05)',
    ),
});
