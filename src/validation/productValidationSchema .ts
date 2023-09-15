import * as Yup from 'yup';
import { ProductFormData } from '../types/Product';
import { ProductType } from '../types/ProductType';

const createPhotoValidation = (imageFile: File | string) => {
  return Yup.mixed().test('fileRequired', 'Photo is required', function () {
    if (!imageFile) {
      return this.createError({
        path: 'photo',
        message: 'Photo is required',
      });
    }
    return true;
  });
};

const createTypeValidation = (typeValue: ProductType) => {
  return Yup.string().test('typeRequired', 'Type is required', function () {
    if (typeValue === ProductType.DEFAULT) {
      return this.createError({
        path: 'type',
        message: 'Type is required',
      });
    }
    return true;
  });
};

export const createProductValidationSchema = (
  imageFile: File | string,
  typeValue: ProductType,
) => {
  return Yup.object<ProductFormData>({
    serialNumber: Yup.string().trim().required('Serial Number is required'),
    isNew: Yup.boolean().required('Is New is required'),
    isRepairing: Yup.boolean().required('Is Repairing is required'),
    photo: createPhotoValidation(imageFile),
    title: Yup.string().trim().required('Title is required'),
    type: createTypeValidation(typeValue),
    specification: Yup.string().trim().required('Specification is required'),
    date: Yup.string()
      .required('Date is required')
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date must be in the format YYYY-MM-DD (e.g., 2023-09-05)',
      ),
    guaranteeStart: Yup.string().required('Guarantee Start is required'),
    guaranteeEnd: Yup.string().required('GuaranteeEnd is required'),
    priceUSD: Yup.number()
      .min(1, 'Price in USD must be greater than 0')
      .required('Price in USD is required'),
    priceUAH: Yup.number()
      .min(1, 'Price in UAH must be greater than 0')
      .required('Price in UAH is required'),
  });
};
