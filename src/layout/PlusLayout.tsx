import { Outlet } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  return (
    <div>
      <Top>
        <Icon>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
        <Icon>
          <FaPlus color={colors.White} size="1.5rem" />
        </Icon>
      </Top>
      <Outlet />
    </div>
  );
}
