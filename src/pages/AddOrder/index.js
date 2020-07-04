import React, { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { Container, Spacer } from './styles';
import api from '~/services/api';
import validator from './validator';

function AddOrder() {
  const [couriers, setCouriers] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const [couriersResult, recipientsResult] = await Promise.all([
        api.get('couriers/'),
        api.get('recipients/'),
      ]);

      setCouriers(couriersResult.data);
      setRecipients(recipientsResult.data);
    };

    fetchData();
  }, []);

  const onFormSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      await api.post('orders/', values);

      toast.success('Encomenda cadastrada com sucesso!');
      actions.resetForm();
    } catch (err) {
      if (err.response?.status === 400) actions.setErrors(err.response.data);
      else toast.error('Erro cadastrando encomenda');
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ product: '', recipient_id: null, courier_id: null }}
        validationSchema={validator}
        onSubmit={onFormSubmit}
        validateOnMount
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting,
        }) => (
          <>
            <div className="title-row">
              <h3>Cadastro de Encomenda</h3>

              <Spacer />

              <button
                disabled={isSubmitting}
                type="button"
                onClick={history.goBack}
              >
                <IoIosArrowBack />
                Voltar
              </button>

              <button
                disabled={!isValid || isSubmitting}
                type="button"
                onClick={handleSubmit}
              >
                <FiCheck />
                Salvar
              </button>
            </div>

            <form>
              <div className="row">
                <label htmlFor="recipient_id">
                  Destinatário
                  <select
                    name="recipient_id"
                    value={values.recipient_id}
                    onChange={handleChange}
                  >
                    <option value={null} disabled selected>
                      Selecione
                    </option>
                    {recipients.map((recipient) => (
                      <option key={String(recipient.id)} value={recipient.id}>
                        {recipient.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="recipient_id"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>

                <label htmlFor="courier_id">
                  Entregador
                  <select
                    name="courier_id"
                    value={values.courier_id}
                    onChange={handleChange}
                  >
                    <option value={null} disabled selected>
                      Selecione
                    </option>
                    {couriers.map((courier) => (
                      <option key={String(courier.id)} value={courier.id}>
                        {courier.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="courier_id"
                    render={(t) => <p className="error-message">{t}</p>}
                  />
                </label>
              </div>

              <label htmlFor="courier_id">
                Nome do Produto
                <input
                  type="text"
                  name="product"
                  placeholder="Nome do Produto"
                  value={values.product}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="product"
                  render={(t) => <p className="error-message">{t}</p>}
                />
              </label>
            </form>
          </>
        )}
      </Formik>
    </Container>
  );
}

export default AddOrder;
