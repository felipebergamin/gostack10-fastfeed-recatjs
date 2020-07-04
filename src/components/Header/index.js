import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Container } from './styles';

function Header() {
  return (
    <Container>
      <img src={Logo} alt="Logo" />

      <div className="separator" />

      <ul>
        <Link to="/orders">
          <li>Encomendas</li>
        </Link>

        <Link to="/couriers">
          <li>Entregadores</li>
        </Link>

        <Link to="/recipients">
          <li>Destinatários</li>
        </Link>

        <Link to="/delivery-problems">
          <li>Problemas</li>
        </Link>
      </ul>

      <div className="spacer" />

      <div className="user-box">
        <strong>Admin</strong>

        <p>sair do sistema</p>
      </div>
    </Container>
  );
}

export default Header;
