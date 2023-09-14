import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Order } from '../../types/Order';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import styles from './Form.module.scss';

import { useMutation, useQueryClient } from 'react-query'; // Import the necessary hooks
import { postOrder } from '../../api/api'; // Import the postOrder function
import { orderValidationSchema } from '../../validation/orderValidationSchema';

interface OrderFormProps {
  onRemoveModal: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onRemoveModal }) => {
  const initialValues: Partial<Order> = {
    title: '',
    date: '',
    description: '',
  };

  const queryClient = useQueryClient(); // Initialize the query client

  const mutation = useMutation((values: Partial<Order>) => postOrder(values), {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
      onRemoveModal();
    },
  });

  const handleSubmit = async (values: Partial<Order>) => {
    try {
      mutation.mutate(values);
      console.log(values);
    } catch (error) {
      console.error('Error submitting form:', error);
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
            {mutation.isLoading ? 'Adding...' : 'Add'}{' '}
            {/* Display loading state */}
          </Button>

          <CloseButton onClose={onRemoveModal} />
        </div>
        {mutation.isError && <div className={styles.error}>ERROOR</div>}
      </Form>
    </Formik>
  );
};
