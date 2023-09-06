import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import styles from './AddModal.module.scss';
import { Order } from '../../types/Order';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import { OrderValidationSchema } from '../../types/validation/OrderValidationSchema';

interface FormProps {
  initialValues: Order;
  validationSchema: OrderValidationSchema || ProductVa;
  onSubmit: () => void;
  onCloseAddModal: () => void;
}

export const AddForm: React.FC<FormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  onCloseAddModal,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className={styles.addModal__formGroup}>
          <label htmlFor="title">Title:</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage
            name="title"
            component="div"
            className={styles.addModal__error}
          />
        </div>

        <div className={styles.addModal__formGroup}>
          <label htmlFor="date">Date:</label>
          <Field type="text" id="date" name="date" />
          <ErrorMessage
            name="date"
            component="div"
            className={styles.addModal__error}
          />
        </div>

        <div className={styles.addModal__formGroup}>
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
            className={styles.addModal__error}
          />
        </div>

        <div className={styles.addModal__actions}>
          <Button
            onClick={onCloseAddModal}
            className={`${styles['addModal__actions-button']} ${styles['addModal__actions-button--cancel']}`}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className={`${styles['addModal__actions-button']} ${styles['addModal__actions-button--add']}`}
          >
            Add
          </Button>

          <CloseButton onClose={onCloseAddModal} />
        </div>
      </Form>
    </Formik>
  );
};
