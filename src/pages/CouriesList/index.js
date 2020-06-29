import React, { useEffect, useState } from 'react';
import { GoPlus, GoSearch, GoPencil, GoX } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import { Container } from './styles';
import api from '~/services/api';

function CouriesList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('couriers/');
      setList(data);
    };

    load();
  }, []);

  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

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

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {list.map((courier) => (
            <tr key={String(courier.id)}>
              <td>{courier.id}</td>
              <td>Foto</td>
              <td>{courier.name}</td>
              <td>{courier.email}</td>
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

export default CouriesList;
