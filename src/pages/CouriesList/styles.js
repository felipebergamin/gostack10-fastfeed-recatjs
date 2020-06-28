import styled from 'styled-components';

export const Container = styled.div`
  h3 {
    font-size: 1.25rem;
  }

  .table-tools {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  input {
    background-color: #ffffff;
    height: 36px;
    width: 237px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-left: 34px;
  }

  input::placeholder {
    color: #999999;
    font-size: 14px;
  }

  .btn-add {
    height: 36px;
    width: 142px;
    background-color: #7d40e7;
    border-radius: 4px;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 14px;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: 16px;
    }
  }

  .input-container {
    position: relative;

    .input-icon {
      font-size: 14px;
      color: #999999;
      position: absolute;
      top: 11px;
      left: 11px;
    }
  }
`;