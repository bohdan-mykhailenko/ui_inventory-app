import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Order } from '../../types/Order';
import { Button } from 'react-bootstrap';
import { CloseButton } from '../CloseButton';
import styles from './Form.module.scss';

interface OrderFormProps {
  onRemoveModal: () => void;
}

const orderValidationSchema = Yup.object({
  title: Yup.string().trim().required('Title is required'),
  date: Yup.string()
    .required('Date is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date must be in the format YYYY-MM-DD (e.g., 2023-09-05)',
    ),
});

export const OrderForm: React.FC<OrderFormProps> = ({ onRemoveModal }) => {
  const initialValues: Order = {
    id: 0,
    title: '',
    date: '',
    description: '',
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
      onRemoveModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={orderValidationSchema}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <Form>
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
            Add
          </Button>

          <CloseButton onClose={onRemoveModal} />
        </div>
      </Form>
    </Formik>
  );
};
