import React, { useCallback, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Product, ProductFormData } from '../../types/Product';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import { ProductType } from '../../types/ProductType';
import { createProductValidationSchema } from '../../validation/productValidationSchema ';
import { postProduct } from '../../api/api';
import { selectOrder } from '../../selectors/itemsSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useErrorHandle } from '../../hooks/useErrorHandle';
import { Loader } from '../Loader';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
  setIsItemChanged,
  setIsOrderSelected,
} from '../../reducers/itemsSlice';
import styles from './Form.module.scss';

interface ProductFormProps {
  onRemoveModal: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onRemoveModal }) => {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandle();
  const [imageFile, setImageFile] = useState<File | string>('');
  const [typeValue, setTypeValue] = useState(ProductType.DEFAULT);
  const selectedOrder = useSelector(selectOrder);
  const queryClient = useQueryClient();

  const validationSchema = createProductValidationSchema(imageFile, typeValue);

  const initialValues: ProductFormData = {
    serialNumber: '',
    isNew: false,
    isRepairing: false,
    photo: imageFile,
    title: '',
    type: typeValue,
    specification: '',
    date: '',
    guaranteeStart: '',
    guaranteeEnd: '',
    priceUSD: 0,
    priceUAH: 0,
  };

  const mutation = useMutation((data: Partial<Product>) => postProduct(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('add product');
      dispatch(setIsItemChanged(true));
    },
  });

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];

    setImageFile(file as File);
  };

  const handleChangeTypeValue = (event: SelectChangeEvent) => {
    setTypeValue(event.target.value as ProductType);
  };

  const handleSubmit = useCallback(
    async (values: ProductFormData) => {
      try {
        const productData: Partial<Product> = {
          serialNumber: values.serialNumber,
          isNew: values.isNew,
          isRepairing: values.isRepairing,
          photo: imageFile,
          title: values.title,
          type: typeValue,
          specification: values.specification,
          guarantee: {
            start: values.guaranteeStart,
            end: values.guaranteeEnd,
          },
          price: [
            { value: values.priceUSD as number, symbol: 'USD', isDefault: 0 },
            { value: values.priceUAH as number, symbol: 'UAH', isDefault: 1 },
          ],
          order_id: selectedOrder?.id,
          date: values.date,
        };

        mutation.mutate(productData);
      } catch (error) {
        handleError(error);
      } finally {
        dispatch(setIsOrderSelected(false));
        onRemoveModal();
      }
    },
    [mutation, handleError],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
            onChange={handleImageFileChange}
          />
          <ErrorMessage
            name="photo"
            component="div"
            className={styles.form__error}
          />
        </div>
        <div className={styles.form__formGroup}>
          <label htmlFor="type">Type:</label>
          <Select
            value={typeValue}
            onChange={handleChangeTypeValue}
            className={styles.form__select}
            name="type"
          >
            <MenuItem value="default" disabled>
              Select an option
            </MenuItem>
            <MenuItem value={ProductType.LAPTOPS}>Laptops</MenuItem>
            <MenuItem value={ProductType.MONITORS}>Monitors</MenuItem>
            <MenuItem value={ProductType.PHONES}>Phones</MenuItem>
            <MenuItem value={ProductType.TABLETS}>Tablets</MenuItem>
          </Select>
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
          <label htmlFor="date">Date:</label>
          <Field type="text" id="date" name="date" />
          <ErrorMessage
            name="date"
            component="div"
            className={styles.form__error}
          />
        </div>
        <div
          className={`${styles.form__formGroup} ${styles['form__formGroup--checkbox']}`}
        >
          <label htmlFor="isNew">Is New:</label>
          <Field
            id="isNew"
            type="checkbox"
            name="isNew"
            className={styles.form__checkbox}
          />
        </div>
        <div
          className={`${styles.form__formGroup} ${styles['form__formGroup--checkbox']}`}
        >
          <label htmlFor="isReapiring">Is Reapiring:</label>
          <Field
            id="isReapiring"
            type="checkbox"
            name="isReapiring"
            className={styles.form__checkbox}
          />
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
            {mutation.isLoading ? <Loader size={15} /> : 'Add'}{' '}
          </Button>

          <CloseButton onClose={onRemoveModal} />
        </div>
      </Form>
    </Formik>
  );
};
