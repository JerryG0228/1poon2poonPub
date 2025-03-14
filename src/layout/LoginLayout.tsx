import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0rem;
  padding: 0.8rem 1rem 0.7rem;

  z-index: 1000;

  background-color: ${colors.Navy};
`;

const Icon = styled.div`
  z-index: 999;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:active {
    opacity: 0.6;
  }
`;

const backNavigationMap: Record<string, string> = {
  '/signup': '/login',
};

export default function LoginLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const HandleIcon = () => {
    const currentPath = location.pathname;

    if (backNavigationMap[currentPath]) {
      navigate(backNavigationMap[currentPath]);
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <Top>
        <Icon
          onClick={HandleIcon}
          style={{ display: location.pathname === '/login' ? 'none' : 'block' }}
        >
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
      </Top>
      <Outlet />
    </div>
  );
}
