import { Outlet, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';
import { CgArrowsExchangeAlt } from 'react-icons/cg';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0rem;
  padding: 1rem;
  z-index: 1000;
  background-color: ${colors.Navy};
`;

const Icon = styled.div`
  cursor: pointer;

  transition: opacity 0.2s ease;
  &:active {
    opacity: 0.6;
  }
`;

export default function PlusLayout() {
  const navigate = useNavigate();

  const HandleIcon = () => {
    navigate('/');
  };

  const HandleHomeClick = () => {
    navigate('/investCategory');
  };

  return (
    <div>
      <Top>
        <Icon onClick={HandleIcon}>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
        <Icon onClick={HandleHomeClick}>
          <CgArrowsExchangeAlt color={colors.White} size="1.6rem" />
        </Icon>
      </Top>
      <Outlet />
    </div>
  );
}
