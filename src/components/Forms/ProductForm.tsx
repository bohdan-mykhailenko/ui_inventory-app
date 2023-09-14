import React, { FormEvent, useState } from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikConsumer,
  FormikHelpers,
  useFormikContext,
} from 'formik';
import { Product, ProductFormData } from '../../types/Product';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import styles from './Form.module.scss';
import { ProductType } from '../../types/ProductType';
import { productValidationSchema } from '../../validation/productValidationSchema ';
import { postProduct } from '../../api/api';

interface ProductFormProps {
  onRemoveModal: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onRemoveModal }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const initialValues: ProductFormData = {
    serialNumber: '',
    isNew: false,
    isRepairing: false,
    photo: '',
    title: '',
    type: '',
    specification: '',
    order_id: null,
    date: '',
    guaranteeStart: '',
    guaranteeEnd: '',
    priceUSD: null,
    priceUAH: null,
  };

  const handleSubmit = async (values: ProductFormData) => {
    try {
      const productData: Partial<Product> = {
        serialNumber: values.serialNumber,
        isNew: values.isNew,
        isRepairing: values.isRepairing,
        photo: imageFile,
        title: values.title,
        type: values.type,
        specification: values.specification,
        guarantee: {
          start: values.guaranteeStart,
          end: values.guaranteeEnd,
        },
        price: [
          { value: values.priceUSD as number, symbol: 'USD', isDefault: 0 },
          { value: values.priceUAH as number, symbol: 'UAH', isDefault: 1 },
        ],
        order_id: values.order_id as number,
        date: values.date,
      };

      console.log('photo', values.photo);
      console.log(productData);

      const product = await postProduct(productData);

      return product;
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      onRemoveModal();
    }
  };

  const formik = useFormikContext<ProductFormData>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    setImageFile(file as File);

    console.log('formik-file', file);
    console.log('formik', formik);
  };

  console.log('imageFile', imageFile);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles['form--product']}>
        <div className={styles.form__formGroup}>
          <label htmlFor="title">Title:</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage
            name="title"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="serialNumber">Serial Number:</label>
          <Field type="text" id="serialNumber" name="serialNumber" />
          <ErrorMessage
            name="serialNumber"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept=".jpg, .jpeg, .png, .gif, .jfif, .webp"
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="type">Type:</label>
          <Field as="select" id="type" name="type">
            <option value="default">Select a type</option>
            <option value={ProductType.LAPTOPS}>Laptops</option>
            <option value={ProductType.MONITORS}>Monitors</option>
            <option value={ProductType.PHONES}>Phones</option>
            <option value={ProductType.TABLETS}>Tablets</option>
          </Field>
          <ErrorMessage
            name="type"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="specification">Specification:</label>
          <Field type="text" id="specification" name="specification" />
          <ErrorMessage
            name="specification"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="guaranteeStart">Guarantee Start:</label>
          <Field type="text" id="guaranteeStart" name="guaranteeStart" />
          <ErrorMessage
            name="guaranteeStart"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="guaranteeEnd">Guarantee End:</label>
          <Field type="text" id="guaranteeEnd" name="guaranteeEnd" />
          <ErrorMessage
            name="guaranteeEnd"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="priceUSD">Price Value (USD):</label>
          <Field type="text" id="priceUSD" name="priceUSD" />
          <ErrorMessage
            name="priceUSD"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="priceUAH">Price Value (UAH):</label>
          <Field type="text" id="priceUAH" name="priceUAH" />
          <ErrorMessage
            name="priceUAH"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="order_id">Order:</label>
          <Field type="text" id="order_id" name="order_id" />
          <ErrorMessage
            name="order_id"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="date">Date:</label>
          <Field type="text" id="date" name="date" />
          <ErrorMessage
            name="date"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label>
            <Field type="checkbox" name="isNew" /> Is New
          </label>
        </div>

        <div className={styles.form__formGroup}>
          <label>
            <Field type="checkbox" name="isRepairing" /> Is Repairing
          </label>
        </div>

        <div className={styles.form__actions}>
          <Button
            onClick={onRemoveModal}
            className={`${styles['form__actions-button']} ${styles['form__actions-button--cancel']}`}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className={`${styles['form__actions-button']} ${styles['form__actions-button--add']}`}
          >
            Add
          </Button>

          <CloseButton onClose={onRemoveModal} />
        </div>
      </Form>
    </Formik>
  );
};
