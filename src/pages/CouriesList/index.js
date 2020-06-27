import React from 'react';
import { GoPlus, GoSearch } from 'react-icons/go';
import { Container } from './styles';

function CouriesList() {
  return (
    <Container>
      <h3>Gerenciando entregadores</h3>

      <div className="table-tools">
        <div className="input-container">
          <GoSearch className="input-icon" />
          <input placeholder="Buscar por entregadores" />
        </div>

        <button className="btn-add" type="button">
          <GoPlus className="icon" color="#fff" />
          Cadastrar
        </button>
      </div>
    </Container>
  );
}

export default CouriesList;
