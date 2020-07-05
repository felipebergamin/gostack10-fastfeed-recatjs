import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    cursor: 'pointer',
  };

  const history = useHistory();
  const [recipientsList, setRecipientsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('recipients');
      setRecipientsList(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`recipients/${id}/`);
    setRecipientsList((list) =>
      list.filter((recipient) => recipient.id !== id)
    );
  };

  const handleEdit = (id) => {
    history.push(`/recipients/${id}/edit`);
  };

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
          {recipientsList.map((recipient) => (
            <tr key={String(recipient.id)}>
              <td>{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
              </td>
              <td>
                <Dropdown
                  trigger={['click']}
                  animation="slide-up"
                  overlay={
                    <Menu style={{ width: 90 }} selectable={false}>
                      <MenuItem
                        key="1"
                        style={menuStyle}
                        onClick={() => handleEdit(recipient.id)}
                      >
                        <GoPencil style={{ marginRight: 10 }} color="#4D85EE" />
                        Editar
                      </MenuItem>
                      <MenuItem
                        key="2"
                        style={menuStyle}
                        onClick={() => handleDelete(recipient.id)}
                      >
                        <GoX style={{ marginRight: 10 }} color="#DE3B3B" />
                        Excluir
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
