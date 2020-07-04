import React from 'react';
import { Link } from 'react-router-dom';
import { GoSearch, GoPlus } from 'react-icons/go';

import { Container } from '~/styles/Container';

function Recipients() {
  return (
    <Container>
      <h3>Gerenciando Destinatários</h3>

      <div className="table-tools">
        <div className="input-container">
          <GoSearch className="input-icon" />
          <input placeholder="Buscar por destinatários" />
        </div>

        <Link className="btn-add" to="/recipients/add">
          <GoPlus className="icon" color="#fff" />
          Cadastrar
        </Link>
      </div>
    </Container>
  );
}

export default Recipients;
