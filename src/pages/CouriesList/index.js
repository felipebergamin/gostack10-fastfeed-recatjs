import React, { useEffect, useState } from 'react';
import { GoPlus, GoSearch, GoPencil, GoX } from 'react-icons/go';
import { Link, useHistory } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { toast } from 'react-toastify';

import { Container } from '~/styles/TableContainer';
import api from '~/services/api';
import { Avatar } from './styles';

function CouriesList() {
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('couriers/');
      setList(data);
    };

    load();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Tem certeza que deseja remover este entregador?'))
      return;

    try {
      await api.delete(`couriers/${id}/`);
      setList((couriersList) =>
        couriersList.filter((courier) => courier.id !== id)
      );
    } catch (err) {
      toast.error('Não foi possível remover o entregador');
    }
  };

  const handleEdit = async (id) => {
    history.push(`/couriers/${id}/edit`);
  };

  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
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
              <td>
                <Avatar
                  className="avatar"
                  alt="Courier Avatar"
                  src={courier.avatar?.url}
                />
              </td>
              <td>{courier.name}</td>
              <td>{courier.email}</td>
              <td>
                <Dropdown
                  trigger={['click']}
                  animation="slide-up"
                  overlay={
                    <Menu style={{ width: 90 }} selectable={false}>
                      <MenuItem
                        key="1"
                        style={menuStyle}
                        onClick={() => handleEdit(courier.id)}
                      >
                        <GoPencil style={{ marginRight: 10 }} color="#4D85EE" />
                        Editar
                      </MenuItem>
                      <MenuItem
                        key="2"
                        style={menuStyle}
                        onClick={() => handleDelete(courier.id)}
                      >
                        <GoX style={{ marginRight: 10 }} color="#DE3B3B" />
                        Remover
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
