import styled from 'styled-components';
import { transparentize } from 'polished';

export const StatusTag = styled.p`
  color: ${(props) => props.color};
  background: ${({ color }) => transparentize(0.9, color)};
  padding: 4px 6px;
  border-radius: 15%;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => props.color};
`;
