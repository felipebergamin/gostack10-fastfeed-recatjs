import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';

import { Container, Spacer } from './styles';
import ImagePicker from '~/components/ImagePicker';

function AddCourier() {
  return (
    <Container>
      <div className="title-row">
        <h3>Cadastro de Empregadores</h3>

        <Spacer />

        <button type="button">
          <IoIosArrowBack />
          Voltar
        </button>

        <button type="button" disabled>
          <FiCheck />
          Salvar
        </button>
      </div>

      <form>
        <ImagePicker />

        <label htmlFor="name">
          Nome
          <input type="text" name="name" placeholder="John Doe" />
        </label>

        <label htmlFor="email">
          E-mail
          <input type="email" placeholder="example@rocketseat.com" />
        </label>
      </form>
    </Container>
  );
}

export default AddCourier;
