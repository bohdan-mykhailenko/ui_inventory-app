import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Order } from '../../types/Order';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import styles from './Form.module.scss';
import { useMutation, useQueryClient } from 'react-query';
import { postOrder } from '../../api/api';
import { orderValidationSchema } from '../../validation/orderValidationSchema';
import { useErrorHandle } from '../../hooks/useErrorHandle';
import { Loader } from '../Loader';
import {
  setIsItemChanged,
  setIsOrderSelected,
} from '../../reducers/itemsSlice';
import { useDispatch } from 'react-redux';

interface OrderFormProps {
  onRemoveModal: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onRemoveModal }) => {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandle();
  const queryClient = useQueryClient();

  const initialValues: Partial<Order> = {
    title: '',
    date: '',
    description: '',
  };

  const mutation = useMutation((values: Partial<Order>) => postOrder(values), {
    onSuccess: () => {
      queryClient.invalidateQueries('add order');
      dispatch(setIsItemChanged(true));
    },
  });

  const handleSubmit = async (values: Partial<Order>) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      handleError(error);
    } finally {
      dispatch(setIsOrderSelected(false));
      onRemoveModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={orderValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
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
          <label htmlFor="date">Date:</label>
          <Field type="text" id="date" name="date" />
          <ErrorMessage
            name="date"
            component="div"
            className={styles.form__error}
          />
        </div>

        <div className={styles.form__formGroup}>
          <label htmlFor="description">Description:</label>
          <Field
            as="textarea"
            id="description"
            name="description"
            style={{ resize: 'none' }}
          />
          <ErrorMessage
            name="description"
            component="div"
            className={styles.form__error}
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
            {mutation.isLoading ? <Loader size={15} /> : 'Add'}
          </Button>

          <CloseButton onClose={onRemoveModal} />
        </div>
        {mutation.isError && <div className={styles.error}>ERROOR</div>}
      </Form>
    </Formik>
  );
};
