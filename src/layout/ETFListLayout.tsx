import { Outlet, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';
import useStore from '@/store/User';

import { IoMenu } from 'react-icons/io5';
import { IoChevronBackSharp } from 'react-icons/io5';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0rem;
  padding: 0.8rem 1rem 0.7rem;
  z-index: 1000;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: ${colors.Navy};
`;

const Icon = styled.div`
  cursor: pointer;

  transition: opacity 0.2s ease;
  &:active {
    opacity: 0.6;
  }
`;

export default function ETFListLayout() {
  const navigate = useNavigate();
  const { interests } = useStore();

  const HandleIcon = () => {
    navigate('/');
  };

  const HandleHomeClick = () => {
    navigate('/etf-list', { state: { selectedCategories: interests } });
  };

  return (
    <div>
      <Top>
        <Icon onClick={HandleIcon}>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
        <Icon onClick={HandleHomeClick}>
          <IoMenu color={colors.White} size="1.6rem" />
        </Icon>
      </Top>
      <Outlet />
    </div>
  );
}
