import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { Container, Spacer } from './styles';
import ImagePicker from '~/components/ImagePicker';
import validator from './validator';
import api from '~/services/api';

function AddCourier({ history }) {
  const filePickerRef = useRef();
  const [avatarFile, setAvatarFile] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validateOnMount: true,
    validationSchema: validator,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);

      const formData = new FormData();
      formData.append('file', avatarFile);
      let avatar_id = null;

      try {
        const {
          data: { id },
        } = await api.post('files/', formData);

        avatar_id = id;
      } catch (err) {
        return toast.error(`Houve um erro ao enviar sua foto`);
      }

      try {
        await api.post('couriers/', {
          ...values,
          avatar_id,
        });
      } catch (err) {
        return toast.error(
          'Desculpe, houve um erro fazendo o cadastro do entregador'
        );
      }

      toast.success('Entregador cadastrado');
      actions.resetForm();
      setAvatarFile(null);
      if (filePickerRef.current) filePickerRef.current.reset();
      return true;
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValidating,
    isValid,
    isSubmitting,
  } = formik;

  const shouldDisableSubmit = !isValid || isValidating || isSubmitting;

  return (
    <Container>
      <div className="title-row">
        <h3>Cadastro de Empregadores</h3>

        <Spacer />

        <button type="button" onClick={history.goBack}>
          <IoIosArrowBack />
          Voltar
        </button>

        <button
          disabled={shouldDisableSubmit}
          type="button"
          onClick={handleSubmit}
        >
          <FiCheck />
          Salvar
        </button>
      </div>

      <form>
        <ImagePicker inputRef={filePickerRef} onChangeFile={setAvatarFile} />

        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <p className="error-message">{errors.name}</p>
          ) : null}
        </label>

        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            placeholder="example@rocketseat.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <p className="error-message">{errors.email}</p>
          ) : null}
        </label>
      </form>
    </Container>
  );
}

AddCourier.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default AddCourier;
