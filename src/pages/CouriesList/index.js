import React from 'react';
import { GoPlus, GoSearch } from 'react-icons/go';
import { Link } from 'react-router-dom';

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

        <Link className="btn-add" to="/couriers/add">
          <GoPlus className="icon" color="#fff" />
          Cadastrar
        </Link>
      </div>
    </Container>
  );
}

export default CouriesList;
