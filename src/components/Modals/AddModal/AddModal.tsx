import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddModal.module.scss';
import { Order } from '../../../types/Order';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../../CloseButton';
import { useDispatch } from 'react-redux';
import { clearDeleteModalTimer } from '../../../reducers/timerSlice';
import {
  setIsOrderAddModalOpen,
  setIsProductAddModalOpen,
} from '../../../reducers/modalsSlice';

interface AddModalProps {
  item: string;
}

export const AddModal: React.FC<AddModalProps> = ({ item }) => {
  const dispatch = useDispatch();

  const isProductPage = item === 'product';

  const initialValues: Order = {
    id: 0,
    title: '',
    date: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().trim().required('Title is required'),
    date: Yup.string()
      .required('Date is required')
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Date must be in the format YYYY-MM-DD (e.g., 2023-09-05)',
      ),
  });

  const removeModal = () => {
    dispatch(clearDeleteModalTimer());

    if (isProductPage) {
      dispatch(setIsProductAddModalOpen(false));
    } else {
      dispatch(setIsOrderAddModalOpen(false));
    }
  };

  const handleCloseAddModal = () => {
    removeModal();
  };

  const handleSubmit = async (values: Order) => {
    console.log(values);

    try {
      const normalizedData = {
        ...values,
        title: values.title.replace(/\s{2,}/g, ' '),
      };

      //  const response = await axios.post('API_URL', normalizedData);
      alert('Form submitted with data:');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      removeModal();
    }
  };

  return (
    <div className={styles.addModal}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              onClick={handleCloseAddModal}
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

            <CloseButton onClose={handleCloseAddModal} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
