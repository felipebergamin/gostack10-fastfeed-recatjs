import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoPlus, GoSearch, GoPencil, GoX } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import { Container } from '~/styles/TableContainer';
import api from '~/services/api';

function Recipients() {
  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const [recipientsList, setRecipientsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('recipients');
      setRecipientsList(data);
    };

    fetchData();
  }, []);

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

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipientsList.map((courier) => (
            <tr key={String(courier.id)}>
              <td>{courier.id}</td>
              <td>{courier.name}</td>
              <td>
                {courier.street}, {courier.number}, {courier.city} -{' '}
                {courier.state}
              </td>
              <td>
                <Dropdown
                  trigger={['click']}
                  animation="slide-up"
                  overlay={
                    <Menu style={{ width: 90 }}>
                      <MenuItem key="1" style={menuStyle}>
                        <GoPencil style={{ marginRight: 10 }} />
                        edit
                      </MenuItem>
                      <MenuItem key="2" style={menuStyle}>
                        <GoX style={{ marginRight: 10 }} />
                        delete
                      </MenuItem>
                    </Menu>
                  }
                >
                  <BsThreeDots className="action-icon" />
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default Recipients;
