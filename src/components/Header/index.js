import React from 'react';

import Logo from '../../assets/logo.svg';
import { Container } from './styles';

function Header() {
  return (
    <Container>
      <img src={Logo} alt="Logo" />

      <div className="separator" />

      <ul>
        <li>Encomendas</li>

        <li>Entregadores</li>

        <li>Destinatários</li>

        <li>Problemas</li>
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
