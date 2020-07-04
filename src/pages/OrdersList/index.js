import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoPlus, GoSearch, GoPencil, GoX } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import { Container } from '~/styles/TableContainer';
import api from '~/services/api';

function OrdersList() {
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('orders/');
      setOrdersList(data);
    };

    fetchData();
  }, []);

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

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order) => (
            <tr key={String(order.id)}>
              <td>{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.courier.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>{order.status}</td>
              <td>
                <Dropdown
                  trigger={['click']}
                  animation="slide-up"
                  overlay={
                    <Menu style={{ width: 90 }}>
                      <MenuItem
                        key="1"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <GoPencil style={{ marginRight: 10 }} />
                        edit
                      </MenuItem>
                      <MenuItem
                        key="2"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
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

export default OrdersList;
