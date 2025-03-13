import { Outlet, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';
import { CgArrowsExchangeAlt } from 'react-icons/cg';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-bottom: 0;
`;

const Icon = styled.div`
  width: 1.5rem;

  margin-bottom: 1rem;
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
