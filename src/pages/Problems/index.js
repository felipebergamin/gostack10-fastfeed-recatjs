import React, { useEffect, useState } from 'react';
import { GoSearch, GoItalic, GoTrashcan } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import { Container } from '~/styles/TableContainer';
import api from '~/services/api';

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await api.get('delivery-problems/');
      setProblems(data);
    };

    loadData();
  }, []);

  return (
    <Container>
      <h3>Problemas na Entrega </h3>

      <div className="table-tools">
        <div className="input-container">
          <GoSearch className="input-icon" />
          <input placeholder="Buscar por destinatários" />
        </div>
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
          {problems.map((problem) => (
            <tr key={String(problem.id)}>
              <td>#{problem.id}</td>
              <td>{problem.order.recipient.name}</td>
              <td>
                {problem.order.recipient.street},{' '}
                {problem.order.recipient.number}, {problem.order.recipient.city}{' '}
                - {problem.order.recipient.state}
              </td>
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
                        <GoItalic style={{ marginRight: 10 }} />
                        Visualizar
                      </MenuItem>
                      <MenuItem
                        key="2"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <GoTrashcan style={{ marginRight: 10 }} />
                        Cancelar Encomenda
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

export default Problems;
