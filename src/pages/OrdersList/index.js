import React from 'react';
import { GoSearch, GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';

import { Container } from '~/styles/TableContainer';

function OrdersList() {
  return (
    <Container>
      <h3>Gerenciando Encomendas</h3>

      <div className="table-tools">
        <div className="input-container">
          <GoSearch className="input-icon" />
          <input placeholder="Buscar por destinatários" />
        </div>

        <Link className="btn-add" to="/orders/add">
          <GoPlus className="icon" color="#fff" />
          Cadastrar
        </Link>
      </div>
    </Container>
  );
}

export default OrdersList;
