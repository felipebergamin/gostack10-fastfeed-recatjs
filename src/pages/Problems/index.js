import React, { useEffect, useState } from 'react';
import { GoSearch, GoItalic, GoTrashcan } from 'react-icons/go';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { toast } from 'react-toastify';

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

  const handleCancel = async ({ id }) => {
    try {
      if (!window.confirm('Deseja cancelar a entrega?')) return;

      await api.post(`/delivery-problems/${id}/cancel-delivery/`);
      toast.success('Esta entrega foi cancelada');
    } catch (err) {
      toast.error(
        err.response?.data?.message ?? 'Não foi possível cancelar a entrega'
      );
    }
  };

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
                    <Menu style={{ width: 110 }} selectable={false}>
                      <MenuItem
                        key="1"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <GoItalic style={{ marginRight: 10 }} color="#4D85EE" />
                        Visualizar
                      </MenuItem>
                      <MenuItem
                        key="2"
                        onClick={() => handleCancel(problem)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <GoTrashcan
                          style={{ marginRight: 10 }}
                          color="#DE3B3B"
                        />
                        Cancelar
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
